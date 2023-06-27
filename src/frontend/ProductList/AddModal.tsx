import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { AddProductModalProps } from '../../types/AddModalProps';
import FormControlElement from '../../types/FormControlElement';
import Product from '../../types/Product';

export default function AddModal({visible, setVisible, handleSubmit}:AddProductModalProps) {

    const [newProduct, setNewProduct] = useState<Product>({
        product_name: "",
        product_description: ""
    });

    useEffect(() => {
        setNewProduct({
            product_name: "",
            product_description: ""
        });
    }, [visible])

    const handleClose = () => setVisible(false);

    const handleChange = (e : React.ChangeEvent<FormControlElement>) => {
        setNewProduct(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const formValid = () => {
        if (!newProduct["product_name"]) return false;
        return true;
    }

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="productForm.NameInput">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product name"
                            name="product_name"
                            value={newProduct.product_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productForm.DescriptionInput">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="product_description"
                            maxLength={250}
                            value={newProduct.product_description}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => {if (formValid()) handleSubmit(newProduct)}}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
