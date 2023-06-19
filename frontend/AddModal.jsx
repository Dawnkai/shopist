import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function AddModal({visible, setVisible}) {
    const handleClose = () => setVisible(false);
    const [newItem, setNewItem] = useState({
        name: "",
        quantity: 0,
        price: 0,
        shop: ""
    });

    const handleChange = (e) => {
        setNewItem(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    useEffect(() => {
        setNewItem({
            name: "",
            quantity: 0,
            price: 0,
            shop: ""
        });
    }, [visible])

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="itemForm.NameInput">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" name="name" value={newItem?.name} onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="itemForm.QuantityInput">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="quantity" value={newItem?.quantity} onChange={(e) => handleChange(e)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="itemForm.PriceInput">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" step="0.01" lang="en" name="price" value={newItem?.price} onChange={(e) => handleChange(e)}/>
                                <InputGroup.Text>zł</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="itemForm.ShopInput">
                        <Form.Label>Shop name</Form.Label>
                        <Form.Control type="text" name="shop" value={newItem?.shop} onChange={(e) => handleChange(e)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleClose}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
