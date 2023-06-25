import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import axios from 'axios';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';


export default function UnitList() {
    const [units, setUnits] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState({
        unit_id: -1,
        unit_display_name: "",
        unit_name: "",
        unit_num: 0
    });

    useEffect(() => {
        axios.get('/api/units').then((result) => setUnits(result?.data)).catch((error) => console.log(error));
    }, []);

    const addUnit = () => {
        setShowAddModal(true);
    }

    const editUnit = (unit) => {
        setSelectedUnit(unit);
        setShowEditModal(true);
    }

    const deleteUnit = (unit) => {
        setSelectedUnit(unit);
        setShowDeleteModal(true);
    }

    const confirmAdd = (newUnit) => {
        axios.post('/api/units', newUnit).then((result) => {
            setUnits(result?.data);
            setShowAddModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmEdit = (editedUnit) => {
        axios.put(`/api/units/${editedUnit?.unit_id}`, editedUnit).then((result) => {
            setUnits(result?.data);
            setShowEditModal(false);
        }).catch((error) => console.log(error));
    }

    const confirmDelete = (unitId) => {
        axios.delete(`/api/units/${unitId}`).then((result) => {
            if (result.status == 204) {
                setUnits(units.filter((unit) => unit["unit_id"] != unitId));
                setShowDeleteModal(false);
            }
        }).catch((error) => console.log(error));
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Units</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={() => addUnit()}>Add New Unit</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table hover>
                    <thead className="table-dark">
                        <tr>
                            <td>Name</td>
                            <td>Full name</td>
                            <td>Numerical value</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            units.map((unit) => (
                                <tr key={unit?.unit_id}>
                                    <td>{unit?.unit_display_name}</td>
                                    <td>{unit?.unit_name}</td>
                                    <td>{unit?.unit_num}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => editUnit(unit)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteUnit(unit)}>Remove</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <AddModal
                visible={showAddModal}
                setVisible={setShowAddModal}
                handleSubmit={confirmAdd}
            />
            <DeleteModal
                visible={showDeleteModal}
                setVisible={setShowDeleteModal}
                selectedUnit={selectedUnit}
                handleSubmit={confirmDelete}
            />
            <EditModal
                visible={showEditModal}
                setVisible={setShowEditModal}
                selectedUnit={selectedUnit}
                handleSubmit={confirmEdit}
            />
        </>
    );
}
