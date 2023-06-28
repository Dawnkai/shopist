import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { DeleteShopModalProps } from '../../types/DeleteModalProps';

export default function DeleteModal({visible, setVisible, selectedShop,
                                    handleSubmit}:DeleteShopModalProps) {
    const handleClose = () => setVisible(false);

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete shop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this shop?
                <hr className="hr"/>
                <Table striped bordered size="sm">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{selectedShop.shop_display_name}</td>
                        </tr>
                        <tr>
                            <td><b>Full name</b></td>
                            <td>{selectedShop.shop_name}</td>
                        </tr>
                        <tr>
                            <td><b>Description</b></td>
                            <td>{selectedShop.shop_description}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>{selectedShop.shop_address}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        if (selectedShop?.shop_id !== undefined)
                        handleSubmit(selectedShop.shop_id)
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
