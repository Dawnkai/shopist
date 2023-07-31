import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { UnitModalProps } from '../../../types/Unit';
import { RootState } from '../../../main/store';

import {
  setUnitDisplayName,
  setUnitName,
  setUnitNum,
} from '../../slices/unitSlice';

export default function EditUnitModal({
  visible,
  setVisible,
  handleSubmit,
}: UnitModalProps) {
  const selectedUnit = useSelector(
    (state: RootState) => state.unit.selectedUnit
  );
  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);

  const formValid = () => {
    if (selectedUnit.unitDisplayName === '') return false;
    if (selectedUnit.unitNum <= 0) return false;
    return true;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit unit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Unit display name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unit display name"
              name="unit_display_name"
              value={selectedUnit?.unitDisplayName}
              onChange={(e) => dispatch(setUnitDisplayName(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unit name"
              name="unit_name"
              value={selectedUnit?.unitName}
              onChange={(e) => dispatch(setUnitName(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit numerical value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Unit value"
              name="unit_num"
              min={0}
              value={selectedUnit?.unitNum}
              onChange={(e) => dispatch(setUnitNum(Number(e.target.value)))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => {
            if (formValid()) handleSubmit(selectedUnit);
          }}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
