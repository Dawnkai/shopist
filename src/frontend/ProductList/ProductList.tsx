import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Product from '../../types/Product';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>({
        product_id: -1,
        product_name: "",
        product_description: ""
    });

    useEffect(() => {
        window.electron.ipcRenderer.once('fetch-products', (products) => {
            setProducts(products as Product[]);
        });
        window.electron.ipcRenderer.sendMessage('fetch-products', []);
    }, []);

    const addProduct = () => {
        setShowAddModal(true);
    }

    const deleteProduct = (product : Product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    }

    const editProduct = (product : Product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    }

    const confirmAdd = (newProduct : Product) => {
        console.log(newProduct);
    }

    const confirmDelete = (productId : number) => {
        console.log(productId);
    }

    const confirmEdit = (editedProduct : Product) => {
        console.log(editedProduct);
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Products</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={addProduct}>Add New Product</Button>
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
