import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function EditModal({visible, setVisible, selectedUnit, handleSubmit}) {

    const [unit, setUnit] = useState({
        unit_id: -1,
        unit_display_name: "",
        unit_name: "",
        unit_num: 0
    });

    useEffect(() => {
        setUnit(selectedUnit);
    }, [visible]);

    const handleClose = () => setVisible(false);

    const handleChange = (e) => {
        setUnit(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="unitForm.DisplayNameInput">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Unit name"
                            name="unit_display_name"
                            value={unit.unit_display_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="unitForm.NameInput">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Unit full name"
                            name="unit_name"
                            value={unit.unit_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="unitForm.ValueInput">
                        <Form.Label>Numerical value</Form.Label>
                        <Form.Control
                            type="number"
                            name="unit_num"
                            min={0}
                            value={unit.unit_num}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => handleSubmit(unit)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
