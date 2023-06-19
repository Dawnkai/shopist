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
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        id: -1,
        name: "",
        quantity: 0,
        price: 0,
        shop: ""
    });

    useEffect(() => {
        axios.get('/api/items').then((result) => setItems(result?.data)).catch((error) => console.log(error));
    }, []);

    const addItem = () => {
        setShowAddModal(true);
    }

    const deleteItem = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    }

    const editItem = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
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
                                <tr key={item?.id}>
                                    <td>{item?.name}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.price} zł</td>
                                    <td>{item?.shop}</td>
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
            <AddModal visible={showAddModal} setVisible={setShowAddModal}/>
            <DeleteModal visible={showDeleteModal} setVisible={setShowDeleteModal} selectedItem={selectedItem}/>
            <EditModal visible={showEditModal} setVisible={setShowEditModal} selectedItem={selectedItem}/>
        </>
    );
}
