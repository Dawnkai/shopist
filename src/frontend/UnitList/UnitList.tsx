import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Unit from '../../types/Unit';

import ModalForm from '../ModalForm';
import DeleteModal from './DeleteModal';
import getUnitControls from '../ModalControls/getUnitControls';
import { BasicFormControl, FormControl } from '../../types/ModalProps';

export default function UnitList() {
  const [units, setUnits] = useState<Unit[]>([] as Unit[]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit>({
    unit_id: -1,
    unit_display_name: '',
    unit_name: '',
    unit_num: 0,
  });

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-units', (unitsList) => {
      setUnits(unitsList as Unit[]);
    });
    window.electron.ipcRenderer.sendMessage('fetch-units', []);
  }, []);

  const extractUnit = (controls: FormControl[]) => {
    const values = controls.reduce(
      (acc: Unit, { control }) => {
        acc[(control as BasicFormControl).name] = (
          control as BasicFormControl
        ).value;
        return acc;
      },
      {
        unit_id: 0,
        unit_display_name: '',
        unit_name: '',
        unit_num: 0,
      }
    );
    return values;
  };

  const addUnit = () => {
    setShowAddModal(true);
  };

  const deleteUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowDeleteModal(true);
  };

  const editUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowEditModal(true);
  };

  const confirmAdd = (controls: FormControl[]) => {
    const values = extractUnit(controls);
    window.electron.ipcRenderer.once('add-unit', (newId) => {
      const id = newId as number;
      if (id > -1) {
        values.unit_id = id;
        setUnits([...units, values as Unit]);
      }
    });
    window.electron.ipcRenderer.sendMessage('add-unit', [values]);
    setShowAddModal(false);
  };

  const confirmDelete = (unitId: number) => {
    window.electron.ipcRenderer.once('delete-unit', (deleted) => {
      if (deleted) {
        setUnits(units.filter((unit) => unit.unit_id !== unitId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-unit', [unitId]);
    setShowDeleteModal(false);
  };

  const confirmEdit = (controls: FormControl[]) => {
    const values = extractUnit(controls);
    values.unit_id = selectedUnit.unit_id;
    window.electron.ipcRenderer.once('edit-unit', (edited) => {
      if (edited) {
        const index = units.findIndex(
          (unit) => unit.unit_id === values.unit_id
        );
        if (index > -1) {
          const unitsCopy = [...units];
          unitsCopy[index] = values;
          setUnits(unitsCopy);
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-unit', [values]);
    setShowEditModal(false);
  };

  return (
    <>
      <Card>
        <Card.Header className="text-white bg-primary">
          <div className="float-start">
            <h3>
              List of <b>Units</b>
            </h3>
          </div>
          <div className="float-end">
            <Button variant="success" onClick={addUnit}>
              Add New Unit
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className="table-dark">
              <tr>
                <td>Name</td>
                <td>Full name</td>
                <td>Numerical value</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit?.unit_id}>
                  <td>{unit?.unit_display_name}</td>
                  <td>{unit?.unit_name}</td>
                  <td>{unit?.unit_num}</td>
                  <td>
                    <Button variant="secondary" onClick={() => editUnit(unit)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteUnit(unit)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <ModalForm
        visible={showAddModal}
        setVisible={setShowAddModal}
        handleSubmit={confirmAdd}
        controls={getUnitControls(undefined)}
        title="Add new unit"
      />
      <DeleteModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        selectedUnit={selectedUnit}
        handleSubmit={confirmDelete}
      />
      <ModalForm
        visible={showEditModal}
        setVisible={setShowEditModal}
        handleSubmit={confirmEdit}
        controls={getUnitControls(selectedUnit)}
        title="Edit unit"
      />
    </>
  );
}
