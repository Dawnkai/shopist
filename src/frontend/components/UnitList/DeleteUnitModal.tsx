import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

import { UnitModalProps } from '../../../types/Unit';
import { RootState } from '../../../main/store';

export default function DeleteUnitModal({
  visible,
  setVisible,
  handleSubmit,
}: UnitModalProps) {
  const handleClose = () => setVisible(false);
  const selectedUnit = useSelector(
    (state: RootState) => state.unit.selectedUnit
  );

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete unit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this unit?
        <hr className="hr" />
        <Table striped bordered size="sm">
          <tbody>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>{selectedUnit.unitDisplayName}</td>
            </tr>
            <tr>
              <td>
                <b>Full name</b>
              </td>
              <td>{selectedUnit.unitName}</td>
            </tr>
            <tr>
              <td>
                <b>Numerical value</b>
              </td>
              <td>{selectedUnit.unitNum}</td>
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
            if (selectedUnit?.unitId !== undefined) handleSubmit(selectedUnit);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
