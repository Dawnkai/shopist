import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Shop from '../../types/Shop';

import DeleteModal from './DeleteModal';
import { FormControl } from '../../types/ModalProps';
import ModalForm from '../ModalForm';
import getShopControls from '../ModalProps/getShopControls';

export default function ShopList() {
  const [shops, setShops] = useState<Shop[]>([] as Shop[]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedShop, setSelectedShop] = useState<Shop>({
    shop_id: -1,
    shop_display_name: '',
    shop_name: '',
    shop_description: '',
    shop_address: '',
  });

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-shops', (shopsList) => {
      setShops(shopsList as Shop[]);
    });
    window.electron.ipcRenderer.sendMessage('fetch-shops', []);
  }, []);

  const extractShop = (controls: FormControl[]) => {
    const values = controls.reduce(
      (acc: Shop, { name, value }) => {
        acc[name] = value;
        return acc;
      },
      {
        shop_id: 0,
        shop_display_name: '',
        shop_name: '',
        shop_description: '',
        shop_address: '',
      }
    );
    return values;
  };

  const addShop = () => {
    setShowAddModal(true);
  };

  const editShop = (shop: Shop) => {
    setSelectedShop(shop);
    setShowEditModal(true);
  };

  const deleteShop = (shop: Shop) => {
    setSelectedShop(shop);
    setShowDeleteModal(true);
  };

  const confirmAdd = (controls: FormControl[]) => {
    const values = extractShop(controls);
    window.electron.ipcRenderer.once('add-shop', (newId) => {
      const id = newId as number;
      if (id > -1) {
        values.shop_id = id;
        setShops([...shops, values as Shop]);
      }
    });
    window.electron.ipcRenderer.sendMessage('add-shop', [values]);
    setShowAddModal(false);
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
          setShops(shopsCopy);
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-shop', [values]);
    setShowEditModal(false);
  };

  const confirmDelete = (shopId: number) => {
    window.electron.ipcRenderer.once('delete-shop', (deleted) => {
      if (deleted) {
        setShops(shops.filter((shop) => shop.shop_id !== shopId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-shop', [shopId]);
    setShowDeleteModal(false);
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
            <Button variant="success" onClick={addShop}>
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
                    <Button variant="secondary" onClick={() => editShop(shop)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteShop(shop)}>
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
        visible={showAddModal}
        setVisible={setShowAddModal}
        handleSubmit={confirmAdd}
        controls={getShopControls(undefined)}
        title="Add new shop"
      />
      <DeleteModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        selectedShop={selectedShop}
        handleSubmit={confirmDelete}
      />
      <ModalForm
        visible={showEditModal}
        setVisible={setShowEditModal}
        handleSubmit={confirmEdit}
        controls={getShopControls(selectedShop)}
        title="Edit shop"
      />
    </>
  );
}
