import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { useSelector, useDispatch } from 'react-redux';
import { defaultItem, Item } from '../../types/Item';
import { Product } from '../../types/Product';
import { Shop } from '../../types/Shop';
import { Unit } from '../../types/Unit';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

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
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );
  const dispatch = useDispatch();

  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-items', (itemsList) => {
      dispatch(setItems(itemsList as Item[]));
    });
    window.electron.ipcRenderer.sendMessage('fetch-items', []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchModalData = () => {
    window.electron.ipcRenderer.once('fetch-products', (productsList) => {
      dispatch(setProducts(productsList as Product[]));
    });
    window.electron.ipcRenderer.once('fetch-shops', (shopsList) => {
      dispatch(setShops(shopsList as Shop[]));
    });
    window.electron.ipcRenderer.once('fetch-units', (unitsList) => {
      dispatch(setUnits(unitsList as Unit[]));
    });
    window.electron.ipcRenderer.sendMessage('fetch-products', []);
    window.electron.ipcRenderer.sendMessage('fetch-shops', []);
    window.electron.ipcRenderer.sendMessage('fetch-units', []);
  };

  const showAddModal = () => {
    fetchModalData();
    setSelectedItem(defaultItem);
    setIsShowAddModal(true);
  };

  const showEditModal = (item: Item) => {
    fetchModalData();
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

  const confirmEdit = (editedItem: Item) => {
    window.electron.ipcRenderer.once('edit-item', (edited) => {
      if (edited) {
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

  const confirmDelete = (itemId: number) => {
    window.electron.ipcRenderer.once('delete-item', (deleted) => {
      if (deleted) {
        dispatch(deleteItem(itemId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-item', [itemId]);
    setIsShowDeleteModal(false);
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
      <AddModal
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        shops={shops}
        units={units}
        products={products}
        handleSubmit={confirmAdd}
      />
      <DeleteModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        selectedItem={selectedItem}
        handleSubmit={confirmDelete}
      />
      <EditModal
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        selectedItem={selectedItem}
        shops={shops}
        units={units}
        products={products}
        handleSubmit={confirmEdit}
      />
    </>
  );
}
