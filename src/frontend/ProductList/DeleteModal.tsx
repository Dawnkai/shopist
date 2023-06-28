import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { DeleteProductModalProps } from '../../types/DeleteModalProps';

export default function DeleteModal({visible, setVisible, selectedProduct,
                                    handleSubmit}:DeleteProductModalProps) {
    const handleClose = () => setVisible(false);

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product?
                <hr className="hr"/>
                <Table striped bordered size="sm">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{selectedProduct.product_name}</td>
                        </tr>
                        <tr>
                            <td><b>Description</b></td>
                            <td>{selectedProduct.product_description}</td>
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
                        if (selectedProduct?.product_id !== undefined)
                        handleSubmit(selectedProduct.product_id);
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
