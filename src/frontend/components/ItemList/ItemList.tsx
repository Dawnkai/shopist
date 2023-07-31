import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { useSelector, useDispatch } from 'react-redux';
import { defaultItem, Item } from '../../../types/Item';
import { Product } from '../../../types/Product';
import { Shop } from '../../../types/Shop';
import { Unit } from '../../../types/Unit';

import AddItemModal from './AddItemModal';
import DeleteItemModal from './DeleteItemModal';
import EditItemModal from './EditItemModal';

import { RootState } from '../../../main/store';

import {
  addItem,
  deleteItem,
  setItems,
  setSelectedItem,
} from '../../slices/itemSlice';

import { setProducts } from '../../slices/productSlice';
import { setShops } from '../../slices/shopSlice';
import { setUnits } from '../../slices/unitSlice';

export default function ItemList() {
  const items = useSelector((state: RootState) => state.item.items);
  const products = useSelector((state: RootState) => state.product.products);
  const shops = useSelector((state: RootState) => state.shop.shops);
  const units = useSelector((state: RootState) => state.unit.units);
  const dispatch = useDispatch();

  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-items', (itemsList) => {
      dispatch(setItems(itemsList as Item[]));
    });
    window.electron.ipcRenderer.once('fetch-products', (productsList) => {
      dispatch(setProducts(productsList as Product[]));
    });
    window.electron.ipcRenderer.once('fetch-shops', (shopsList) => {
      dispatch(setShops(shopsList as Shop[]));
    });
    window.electron.ipcRenderer.once('fetch-units', (unitsList) => {
      dispatch(setUnits(unitsList as Unit[]));
    });
    if (items.length === 0) {
      window.electron.ipcRenderer.sendMessage('fetch-items', []);
    }
    if (products.length === 0) {
      window.electron.ipcRenderer.sendMessage('fetch-products', []);
    }
    if (shops.length === 0) {
      window.electron.ipcRenderer.sendMessage('fetch-shops', []);
    }
    if (units.length === 0) {
      window.electron.ipcRenderer.sendMessage('fetch-units', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    setSelectedItem(defaultItem);
    setIsShowAddModal(true);
  };

  const showEditModal = (item: Item) => {
    setSelectedItem(item);
    setIsShowEditModal(true);
  };

  const showDeleteModal = (item: Item) => {
    setSelectedItem(item);
    setIsShowDeleteModal(true);
  };

  const confirmAdd = (newItem: Item) => {
    window.electron.ipcRenderer.once('add-item', (newId) => {
      const id = newId as number;
      if (id > -1) {
        newItem.itemId = id;
        dispatch(addItem(newItem));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-item', [newItem]);
    setIsShowAddModal(false);
  };
  const confirmDelete = (item: Item) => {
    window.electron.ipcRenderer.once('delete-item', (isDeleted) => {
      if (isDeleted && item.itemId) {
        dispatch(deleteItem(item.itemId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-item', [item.itemId]);
    setIsShowDeleteModal(false);
  };

  const confirmEdit = (editedItem: Item) => {
    window.electron.ipcRenderer.once('edit-item', (isEdited) => {
      if (isEdited) {
        const index = items.findIndex(
          (item) => item.itemId === editedItem.itemId
        );
        if (index > -1) {
          const itemsCopy = [...items];
          itemsCopy[index] = editedItem;
          dispatch(setItems(itemsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-item', [editedItem]);
    setIsShowEditModal(false);
  };

  return (
    <>
      <Card>
        <Card.Header className="text-white bg-primary">
          <div className="float-start">
            <h3>
              List of <b>Items</b>
            </h3>
          </div>
          <div className="float-end">
            <Button variant="success" onClick={() => showAddModal()}>
              Add New Item
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className="table-dark">
              <tr>
                <td>Product Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Shop</td>
                <td>Date</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item?.itemId}>
                  <td>{item?.itemProductName}</td>
                  <td>
                    {item?.itemQuantity} {item?.itemUnitDisplayName}
                  </td>
                  <td>{item?.itemPrice} zł</td>
                  <td>{item?.itemShopDisplayName}</td>
                  <td>{item?.itemDate}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => showEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => showDeleteModal(item)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AddItemModal
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
      />
      <DeleteItemModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        handleSubmit={confirmDelete}
      />
      <EditItemModal
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
      />
    </>
  );
}
