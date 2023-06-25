import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';


export default function ShopList() {
    const [shops, setShops] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedShop, setSelectedShop] = useState({
        shop_id: -1,
        shop_display_name: "",
        shop_name: "",
        shop_description: "",
        shop_address: ""
    });

    useEffect(() => {
        axios.get('/api/shops').then((result) => setShops(result?.data)).catch((error) => console.log(error));
    }, []);

    const addShop = () => {
        setShowAddModal(true);
    }

    const editShop = (shop) => {
        setSelectedShop(shop);
        setShowEditModal(true);
    }

    const deleteShop = (shop) => {
        setSelectedShop(shop);
        setShowDeleteModal(true);
    }

    const confirmAdd = (newShop) => {
        axios.post('/api/shops', newShop).then((result) => {
            setShops(result?.data);
            setShowAddModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmEdit = (editedShop) => {
        axios.put(`/api/shops/${editedShop?.shop_id}`, editedShop).then((result) => {
            setShops(result?.data);
            setShowEditModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmDelete = (shopId) => {
        axios.delete(`/api/shops/${shopId}`).then((result) => {
            if (result.status == 204) {
                setShops(shops.filter((shop) => shop["shop_id"] != shopId));
                setShowDeleteModal(false);
            }
        }).catch((error) => console.log(error));
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Shops</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={() => addShop()}>Add New Shop</Button>
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
                                        <Button variant="secondary" onClick={() => editShop(shop)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteShop(shop)}>Remove</Button>
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
