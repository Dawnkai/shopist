import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

export default function DeleteModal({visible, setVisible, selectedItem, handleSubmit}) {
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
                            <td>{selectedItem["product_name"]}</td>
                        </tr>
                        <tr>
                            <td><b>Quantity</b></td>
                            <td>{selectedItem["item_quantity"]} {selectedItem["unit_name"]}</td>
                        </tr>
                        <tr>
                            <td><b>Date</b></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Shop</b></td>
                            <td>{selectedItem["shop_name"]}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleSubmit(selectedItem["item_id"])}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
