import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { Shop, defaultShop } from '../../types/Shop';

import DeleteModal from './DeleteModal';
import { BasicFormControl, FormControl } from '../../types/ModalProps';
import ModalForm from '../../ModalForm';
import getShopControls from '../ModalControls/getShopControls';
import { RootState } from '../../../main/store';

import {
  addShop,
  deleteShop,
  setShops,
  setSelectedShop,
} from '../../slices/shopSlice';

export default function ShopList() {
  const shops = useSelector((state: RootState) => state.shop.shops);
  const selectedShop = useSelector(
    (state: RootState) => state.shop.selectedShop
  );
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

  const extractShop = (controls: FormControl[]) => {
    const values = controls.reduce((acc: Shop, { control }) => {
      acc[(control as BasicFormControl).name] = (
        control as BasicFormControl
      ).value;
      return acc;
    }, defaultShop);
    return values;
  };

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

  const confirmAdd = (controls: FormControl[]) => {
    const values = extractShop(controls);
    delete values.shop_id;
    window.electron.ipcRenderer.once('add-shop', (newId) => {
      const id = newId as number;
      if (id > -1) {
        values.shop_id = id;
        dispatch(addShop(values));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-shop', [values]);
    setIsShowAddModal(false);
  };

  const confirmEdit = (controls: FormControl[]) => {
    const values = extractShop(controls);
    values.shop_id = selectedShop.shop_id;
    window.electron.ipcRenderer.once('edit-shop', (edited) => {
      if (edited) {
        const index = shops.findIndex(
          (shop) => shop.shop_id === values.shop_id
        );
        if (index > -1) {
          const shopsCopy = [...shops];
          shopsCopy[index] = values;
          dispatch(setShops(shopsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-shop', [values]);
    setIsShowEditModal(false);
  };

  const confirmDelete = (shopId: number) => {
    window.electron.ipcRenderer.once('delete-shop', (deleted) => {
      if (deleted) {
        dispatch(deleteShop(shopId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-shop', [shopId]);
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
                <tr key={shop?.shop_id}>
                  <td>{shop?.shop_display_name}</td>
                  <td>{shop?.shop_name}</td>
                  <td>{shop?.shop_description}</td>
                  <td>{shop?.shop_address}</td>
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
      <ModalForm
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
        controls={getShopControls(undefined)}
        title="Add new shop"
      />
      <DeleteModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        selectedShop={selectedShop}
        handleSubmit={confirmDelete}
      />
      <ModalForm
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
        controls={getShopControls(selectedShop)}
        title="Edit shop"
      />
    </>
  );
}
