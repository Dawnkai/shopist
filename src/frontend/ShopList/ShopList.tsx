import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Shop from '../../types/Shop';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function ShopList() {
    const [shops, setShops] = useState<Shop[]>([] as Shop[]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [selectedShop, setSelectedShop] = useState<Shop>({
        shop_id: -1,
        shop_display_name: "",
        shop_name: "",
        shop_description: "",
        shop_address: ""
    });

    useEffect(() => {
        window.electron.ipcRenderer.once('fetch-shops', (shops) => {
            setShops(shops as Shop[]);
        });
        window.electron.ipcRenderer.sendMessage('fetch-shops', []);
    }, []);

    const addShop = () => {
        setShowAddModal(true);
    }

    const editShop = (shop : Shop) => {
        setSelectedShop(shop);
        setShowEditModal(true);
    }

    const deleteShop = (shop : Shop) => {
        setSelectedShop(shop);
        setShowDeleteModal(true);
    }

    const confirmAdd = (newShop : Shop) => {
        window.electron.ipcRenderer.once('add-shop', (newId) => {
            const id = newId as number;
            if (id > -1) {
                newShop.shop_id = id;
                setShops([...shops, newShop]);
            }
        });
        window.electron.ipcRenderer.sendMessage('add-shop', [newShop]);
        setShowAddModal(false);
    }

    const confirmEdit = (editedShop : Shop) => {
        window.electron.ipcRenderer.once('edit-shop', (edited) => {
            if (edited) {
                const index = shops.findIndex((shop) => shop.shop_id === editedShop.shop_id);
                if (index > -1) {
                    const shopsCopy = [...shops];
                    shopsCopy[index] = editedShop;
                    setShops(shopsCopy);
                }
            }
        });
        window.electron.ipcRenderer.sendMessage('edit-shop', [editedShop]);
        setShowEditModal(false);
    }

    const confirmDelete = (shopId : number) => {
        window.electron.ipcRenderer.once('delete-shop', (deleted) => {
            if (deleted) {
                setShops(shops.filter((shop) => shop.shop_id !== shopId));
            }
        });
        window.electron.ipcRenderer.sendMessage('delete-shop', [shopId]);
        setShowDeleteModal(false);
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Shops</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={addShop}>Add New Shop</Button>
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
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shops.map((shop) => (
                                <tr key={shop?.shop_id}>
                                    <td>{shop?.shop_display_name}</td>
                                    <td>{shop?.shop_name}</td>
                                    <td>{shop?.shop_description}</td>
                                    <td>{shop?.shop_address}</td>
                                    <td>
                                        <Button
                                            variant="secondary"
                                            onClick={() => editShop(shop)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteShop(shop)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <AddModal
                visible={showAddModal}
                setVisible={setShowAddModal}
                handleSubmit={confirmAdd}
            />
            <DeleteModal
                visible={showDeleteModal}
                setVisible={setShowDeleteModal}
                selectedShop={selectedShop}
                handleSubmit={confirmDelete}
            />
            <EditModal
                visible={showEditModal}
                setVisible={setShowEditModal}
                selectedShop={selectedShop}
                handleSubmit={confirmEdit}
            />
        </>
    );
}
