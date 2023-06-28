import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { EditProductModalProps } from '../../types/EditModalProps';
import FormControlElement from '../../types/FormControlElement';
import Product from '../../types/Product';

export default function EditModal({visible, setVisible, selectedProduct,
                                   handleSubmit}:EditProductModalProps) {

    const [product, setProduct] = useState<Product>({
        product_id: -1,
        product_name: "",
        product_description: ""
    });

    useEffect(() => {
        setProduct(selectedProduct);
    }, [visible]);

    const handleClose = () => setVisible(false);

    const handleChange = (e : React.ChangeEvent<FormControlElement>) => {
        setProduct(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="productForm.NameInput">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product name"
                            name="product_name"
                            value={product.product_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productForm.DescriptionInput">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="product_description"
                            maxLength={250}
                            value={product?.product_description}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => handleSubmit(product)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
