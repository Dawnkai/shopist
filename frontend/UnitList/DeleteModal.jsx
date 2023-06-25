import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

export default function DeleteModal({visible, setVisible, selectedUnit, handleSubmit}) {
    const handleClose = () => setVisible(false);

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this unit?
                <hr className="hr"/>
                <Table striped bordered size="sm">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{selectedUnit["unit_display_name"]}</td>
                        </tr>
                        <tr>
                            <td><b>Full name</b></td>
                            <td>{selectedUnit["unit_name"]}</td>
                        </tr>
                        <tr>
                            <td><b>Numerical value</b></td>
                            <td>{selectedUnit["unit_num"]}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleSubmit(selectedUnit["unit_id"])}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
