import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { AddUnitModalProps } from '../../types/AddModalProps';
import FormControlElement from '../../types/FormControlElement';
import Unit from '../../types/Unit';

export default function AddModal({visible, setVisible, handleSubmit}:AddUnitModalProps) {
    const [newUnit, setNewUnit] = useState<Unit>({
        unit_display_name: "",
        unit_name: "",
        unit_num: 0
    });

    useEffect(() => {
        setNewUnit({
            unit_display_name: "",
            unit_name: "",
            unit_num: 0
        })
    }, [visible]);

    const handleClose = () => setVisible(false);

    const handleChange = (e : React.ChangeEvent<FormControlElement>) => {
        setNewUnit(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const formValid = () => {
        if (!newUnit["unit_display_name"]) return false;
        if (!newUnit["unit_name"]) return false;
        return true;
    }

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="unitForm.DisplayNameInput">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Unit name"
                            name="unit_display_name"
                            value={newUnit.unit_display_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="unitForm.NameInput">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Unit full name"
                            name="unit_name"
                            value={newUnit.unit_name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="unitForm.ValueInput">
                        <Form.Label>Numerical value</Form.Label>
                        <Form.Control
                            type="number"
                            name="unit_num"
                            min={0}
                            value={newUnit.unit_num}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => {if (formValid()) handleSubmit(newUnit)}}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
