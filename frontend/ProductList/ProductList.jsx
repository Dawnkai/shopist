import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        product_id: -1,
        product_name: "",
        product_description: ""
    });

    useEffect(() => {
        axios.get('/api/products').then((result) => setProducts(result?.data)).catch((error) => console.log(error));
    }, []);

    const addProduct = () => {
        setShowAddModal(true);
    }

    const editProduct = (unit) => {
        setSelectedProduct(unit);
        setShowEditModal(true);
    }

    const deleteProduct = (unit) => {
        setSelectedProduct(unit);
        setShowDeleteModal(true);
    }

    const confirmAdd = (newProduct) => {
        axios.post('/api/products', newProduct).then((result) => {
            setProducts(result?.data);
            setShowAddModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmEdit = (editedProductt) => {
        axios.put(`/api/products/${editedProductt?.product_id}`, editedProductt).then((result) => {
            setProducts(result?.data);
            setShowEditModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmDelete = (productId) => {
        axios.delete(`/api/products/${productId}`).then((result) => {
            if (result.status == 204) {
                setProducts(products.filter((product) => product["product_id"] != productId));
                setShowDeleteModal(false);
            }
        }).catch((error) => console.log(error));
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Products</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={() => addProduct()}>Add New Product</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table hover>
                    <thead className="table-dark">
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => (
                                <tr key={product?.product_id}>
                                    <td>{product?.product_name}</td>
                                    <td>{product?.product_description}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => editProduct(product)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteProduct(product)}>Remove</Button>
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
                selectedProduct={selectedProduct}
                handleSubmit={confirmDelete}
            />
            <EditModal
                visible={showEditModal}
                setVisible={setShowEditModal}
                selectedProduct={selectedProduct}
                handleSubmit={confirmEdit}
            />
        </>
    );
}
