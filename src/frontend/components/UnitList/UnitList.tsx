import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { defaultUnit, Unit } from '../../types/Unit';

import ModalForm from '../../ModalForm';
import DeleteModal from './DeleteModal';
import getUnitControls from '../ModalControls/getUnitControls';
import { BasicFormControl, FormControl } from '../../types/ModalProps';

import { RootState } from '../../../main/store';

import {
  addUnit,
  deleteUnit,
  setUnits,
  setSelectedUnit,
} from '../../slices/unitSlice';

export default function UnitList() {
  const units = useSelector((state: RootState) => state.unit.units);
  const selectedUnit = useSelector(
    (state: RootState) => state.unit.selectedUnit
  );
  const dispatch = useDispatch();

  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-units', (unitsList) => {
      dispatch(setUnits(unitsList as Unit[]));
    });
    window.electron.ipcRenderer.sendMessage('fetch-units', []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractUnit = (controls: FormControl[]) => {
    const values = controls.reduce((acc: Unit, { control }) => {
      acc[(control as BasicFormControl).name] = (
        control as BasicFormControl
      ).value;
      return acc;
    }, defaultUnit);
    return values;
  };

  const showAddModal = () => {
    dispatch(setSelectedUnit(defaultUnit));
    setIsShowAddModal(true);
  };

  const showDeleteModal = (unit: Unit) => {
    dispatch(setSelectedUnit(unit));
    setIsShowDeleteModal(true);
  };

  const showEditModal = (unit: Unit) => {
    dispatch(setSelectedUnit(unit));
    setIsShowEditModal(true);
  };

  const confirmAdd = (controls: FormControl[]) => {
    const values = extractUnit(controls);
    delete values.unit_id;
    window.electron.ipcRenderer.once('add-unit', (newId) => {
      const id = newId as number;
      if (id > -1) {
        values.unit_id = id;
        dispatch(addUnit(values));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-unit', [values]);
    setIsShowAddModal(false);
  };

  const confirmDelete = (unitId: number) => {
    window.electron.ipcRenderer.once('delete-unit', (deleted) => {
      if (deleted) {
        dispatch(deleteUnit(unitId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-unit', [unitId]);
    setIsShowDeleteModal(false);
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
          dispatch(setUnits(unitsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-unit', [values]);
    setIsShowEditModal(false);
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
            <Button variant="success" onClick={showAddModal}>
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
                    <Button
                      variant="secondary"
                      onClick={() => showEditModal(unit)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => showDeleteModal(unit)}
                    >
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
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
        controls={getUnitControls(undefined)}
        title="Add new unit"
      />
      <DeleteModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        selectedUnit={selectedUnit}
        handleSubmit={confirmDelete}
      />
      <ModalForm
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
        controls={getUnitControls(selectedUnit)}
        title="Edit unit"
      />
    </>
  );
}
