import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { defaultUnit, Unit } from '../../../types/Unit';

import AddUnitModal from './AddUnitModal';
import DeleteUnitModal from './DeleteUnitModal';
import EditUnitModal from './EditUnitModal';

import { RootState } from '../../../main/store';

import {
  addUnit,
  deleteUnit,
  setUnits,
  setSelectedUnit,
} from '../../slices/unitSlice';

export default function UnitList() {
  const units = useSelector((state: RootState) => state.unit.units);
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

  const confirmAdd = (newUnit: Unit) => {
    window.electron.ipcRenderer.once('add-unit', (newId) => {
      const id = newId as number;
      if (id > -1) {
        newUnit.unitId = id;
        dispatch(addUnit(newUnit));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-unit', [newUnit]);
    setIsShowAddModal(false);
  };

  const confirmDelete = (unit: Unit) => {
    window.electron.ipcRenderer.once('delete-unit', (isDeleted) => {
      if (isDeleted && unit.unitId) {
        dispatch(deleteUnit(unit.unitId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-unit', [unit.unitId]);
    setIsShowDeleteModal(false);
  };

  const confirmEdit = (editedUnit: Unit) => {
    window.electron.ipcRenderer.once('edit-unit', (isEdited) => {
      if (isEdited) {
        const index = units.findIndex(
          (unit) => unit.unitId === editedUnit.unitId
        );
        if (index > -1) {
          const unitsCopy = [...units];
          unitsCopy[index] = editedUnit;
          dispatch(setUnits(unitsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-unit', [editedUnit]);
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
                <tr key={unit?.unitId}>
                  <td>{unit?.unitDisplayName}</td>
                  <td>{unit?.unitName}</td>
                  <td>{unit?.unitNum}</td>
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
      <AddUnitModal
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
      />
      <DeleteUnitModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        handleSubmit={confirmDelete}
      />
      <EditUnitModal
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
      />
    </>
  );
}
