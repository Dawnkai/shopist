import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

import axios from 'axios';


export default function ItemList() {
    const [items, setItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    const [units, setUnits] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        item_id: -1,
        item_quantity: 0,
        item_price: 0,
        item_product: -1,
        product_name: "",
        item_unit: -1,
        unit_name: "",
        item_shop: -1,
        shop_name: ""
    });

    useEffect(() => {
        axios.get('/api/items').then((result) => setItems(result?.data)).catch((error) => console.log(error));
    }, []);

    const fetchModalData = () => {
        axios.get('/api/shops').then((result) => setShops(result?.data)).catch((error) => console.log(error));
        axios.get('/api/units').then((result) => setUnits(result?.data)).catch((error) => console.log(error));
        axios.get('/api/products').then((result) => setProducts(result?.data)).catch((error) => console.log(error));
    }

    const addItem = () => {
        fetchModalData();
        setShowAddModal(true);
    }

    const editItem = (item) => {
        fetchModalData();
        setSelectedItem(item);
        setShowEditModal(true);
    }

    const deleteItem = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    }

    const confirmAdd = (newData) => {
        axios.post('/api/items', newData).then((result) => {
            setItems(result?.data);
            setShowAddModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmEdit = (editedData) => {
        axios.put(`/api/items/${editedData?.item_id}`, editedData).then((result) => {
            setItems(result?.data);
            setShowEditModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmDelete = (itemId) => {
        axios.delete(`/api/items/${itemId}`).then((result) => {
            if (result.status == 204) {
                setItems(items.filter((item) => item["item_id"] != itemId));
                setShowDeleteModal(false);
            }
        }).catch((error) => console.log(error));
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Items</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={() => addItem()}>Add New Item</Button>
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
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr key={item?.item_id}>
                                    <td>{item?.product_name}</td>
                                    <td>{item?.item_quantity} {item?.unit_name}</td>
                                    <td>{item?.item_price} zł</td>
                                    <td>{item?.shop_name}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => editItem(item)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteItem(item)}>Remove</Button>
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
                shops={shops}
                units={units}
                products={products}
                handleSubmit={confirmAdd}
            />
            <DeleteModal
                visible={showDeleteModal}
                setVisible={setShowDeleteModal}
                selectedItem={selectedItem}
                handleSubmit={confirmDelete}
            />
            <EditModal 
                visible={showEditModal}
                setVisible={setShowEditModal}
                selectedItem={selectedItem}
                shops={shops}
                units={units}
                products={products}
                handleSubmit={confirmEdit}
            />
        </>
    );
}
