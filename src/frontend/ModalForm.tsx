import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FormControl, ModalProps } from '../types/ModalProps';

export default function ModalForm({
  visible,
  setVisible,
  handleSubmit,
  controls,
  title,
}: ModalProps) {
  const [formControls, setFormControls] = useState<FormControl[]>(controls);

  useEffect(() => {
    setFormControls(controls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, controls]);

  const handleClose = () => setVisible(false);

  const handleChange = (value: any, controlIdx: number) => {
    const prevControls = [...formControls];
    prevControls[controlIdx].value = value;
    setFormControls(prevControls);
  };

  const isFormValid = () => {
    let valid: boolean = true;
    // eslint-disable-next-line consistent-return
    formControls.forEach((control) => {
      if (!control.validation(control.value)) valid = false;
    });
    return valid;
  };

  const getInputComponent = (control: FormControl, controlIdx: number) => {
    if (control.inputType === 'input') {
      return (
        <Form.Control
          type={control.valueType}
          placeholder={control.placeholder}
          name={control.name}
          value={control.value}
          onChange={(e) => handleChange(e.target.value, controlIdx)}
        />
      );
    }
    if (control.inputType === 'select' && control.valueRange !== null) {
      return (
        <Form.Select
          aria-label={`${control.name}-select`}
          value={control.value}
          name={control.name}
          onChange={(e) => handleChange(e.target.value, controlIdx)}
        >
          <option aria-label="none" />
          {control.valueRange!.map((value) => (
            <option key={`${value}`}>{value}</option>
          ))}
        </Form.Select>
      );
    }
    if (control.inputType === 'dropdown' && control.valueRange !== null) {
      return (
        <DropdownButton variant="outline-secondary" title={control.value}>
          {control.valueRange!.map((value) => (
            <Dropdown.Item
              key={value}
              name={control.name}
              onClick={(e) =>
                handleChange((e.target as HTMLElement).textContent, controlIdx)
              }
            >
              {value}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      );
    }
    return null;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {formControls.map((control, controlIdx) => {
            return (
              <Form.Group
                className="mb-3"
                controlId={`addForm.${control.name}Input`}
                key={control.name}
              >
                {getInputComponent(control, controlIdx)}
              </Form.Group>
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => {
            if (isFormValid()) handleSubmit(formControls);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
