import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { EditShopModalProps } from '../../types/EditModalProps';
import FormControlElement from '../../types/FormControlElement';
import Shop from '../../types/Shop';

export default function EditModal({visible, setVisible, selectedShop, handleSubmit}:EditShopModalProps) {

    const [shop, setShop] = useState<Shop>({
        shop_id: -1,
        shop_display_name: "",
        shop_name: "",
        shop_description: "",
        shop_address: ""
    });

    useEffect(() => {
        setShop(selectedShop);
    }, [visible]);

    const handleClose = () => setVisible(false);

    const handleChange = (e : React.ChangeEvent<FormControlElement>) => {
        setShop(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit shop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="shopForm.DisplayNameInput">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Shop name"
                            name="shop_display_name"
                            value={shop?.shop_display_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="shopForm.NameInput">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Shop full name"
                            name="shop_name"
                            value={shop?.shop_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="shopForm.DescriptionInput">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="shop_description"
                            maxLength={250}
                            value={shop?.shop_description}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="shopForm.AddressInput">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Shop address"
                            name="shop_address"
                            value={shop?.shop_address}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => handleSubmit(shop)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
