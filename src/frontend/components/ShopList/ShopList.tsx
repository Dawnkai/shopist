import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { Shop, defaultShop } from '../../../types/Shop';

import AddShopModal from './AddShopModal';
import DeleteShopModal from './DeleteShopModal';
import EditShopModal from './EditShopModal';
import { RootState } from '../../../main/store';

import {
  addShop,
  deleteShop,
  setShops,
  setSelectedShop,
} from '../../slices/shopSlice';

export default function ShopList() {
  const shops = useSelector((state: RootState) => state.shop.shops);
  const dispatch = useDispatch();

  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-shops', (shopsList) => {
      dispatch(setShops(shopsList as Shop[]));
    });
    window.electron.ipcRenderer.sendMessage('fetch-shops', []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    dispatch(setSelectedShop(defaultShop));
    setIsShowAddModal(true);
  };

  const showEditModal = (shop: Shop) => {
    dispatch(setSelectedShop(shop));
    setIsShowEditModal(true);
  };

  const showDeleteModal = (shop: Shop) => {
    dispatch(setSelectedShop(shop));
    setIsShowDeleteModal(true);
  };

  const confirmAdd = (newShop: Shop) => {
    window.electron.ipcRenderer.once('add-shop', (newId) => {
      const id = newId as number;
      if (id > -1) {
        newShop.shopId = id;
        dispatch(addShop(newShop));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-shop', [newShop]);
    setIsShowAddModal(false);
  };

  const confirmEdit = (editedShop: Shop) => {
    window.electron.ipcRenderer.once('edit-shop', (isEdited) => {
      if (isEdited) {
        const index = shops.findIndex(
          (product) => product.productId === editedShop.productId
        );
        if (index > -1) {
          const shopsCopy = [...shops];
          shopsCopy[index] = editedShop;
          dispatch(setShops(shopsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-product', [editedShop]);
    setIsShowEditModal(false);
  };

  const confirmDelete = (shop: Shop) => {
    window.electron.ipcRenderer.once('delete-shop', (isDeleted) => {
      if (isDeleted && shop.shopId) {
        dispatch(deleteShop(shop.shopId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-shop', [shop.shopId]);
    setIsShowDeleteModal(false);
  };

  return (
    <>
      <Card>
        <Card.Header className="text-white bg-primary">
          <div className="float-start">
            <h3>
              List of <b>Shops</b>
            </h3>
          </div>
          <div className="float-end">
            <Button variant="success" onClick={showAddModal}>
              Add New Shop
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className="table-dark">
              <tr>
                <td>Name</td>
                <td>Full name</td>
                <td>Description</td>
                <td>Address</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop?.shopId}>
                  <td>{shop?.shopDisplayName}</td>
                  <td>{shop?.shopName}</td>
                  <td>{shop?.shopDescription}</td>
                  <td>{shop?.shopAddress}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => showEditModal(shop)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => showDeleteModal(shop)}
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
      <AddShopModal
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
      />
      <DeleteShopModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        handleSubmit={confirmDelete}
      />
      <EditShopModal
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
      />
    </>
  );
}
