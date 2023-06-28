import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { DeleteItemModalProps } from '../../types/DeleteModalProps';

export default function DeleteModal({visible, setVisible,
                                     selectedItem, handleSubmit}:DeleteItemModalProps) {
    const handleClose = () => setVisible(false);

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this item?
                <hr className="hr"/>
                <Table striped bordered size="sm">
                    <tbody>
                        <tr>
                            <td><b>Product</b></td>
                            <td>{selectedItem.product_name}</td>
                        </tr>
                        <tr>
                            <td><b>Quantity</b></td>
                            <td>{selectedItem.item_quantity} {selectedItem.unit_display_name}</td>
                        </tr>
                        <tr>
                            <td><b>Date</b></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Shop</b></td>
                            <td>{selectedItem.shop_display_name}</td>
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
                        if (selectedItem?.item_id !== undefined)
                        handleSubmit(selectedItem.item_id);
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
