import React, { useState, useEffect, ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BasicFormControl, FormControl, ModalProps } from '../types/ModalProps';

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
    (prevControls[controlIdx].control as BasicFormControl).value = value;
    setFormControls(prevControls);
  };

  const isFormValid = () => {
    let valid: boolean = true;
    // eslint-disable-next-line consistent-return
    formControls.forEach((control) => {
      if (
        control.type === 'basic' &&
        !(control.control as BasicFormControl).validation(
          (control.control as BasicFormControl).value
        )
      )
        valid = false;
    });
    return valid;
  };

  const getInputComponent = (control: BasicFormControl, controlIdx: number) => {
    if (control.inputType === 'input') {
      return (
        <Form.Group
          className="mb-3"
          controlId={`addForm.${control.name}Input`}
          key={control.name}
        >
          <Form.Label>{control.title}</Form.Label>
          <Form.Control
            type={control.valueType}
            placeholder={control.placeholder}
            name={control.name}
            value={control.value}
            onChange={(e) => handleChange(e.target.value, controlIdx)}
          />
        </Form.Group>
      );
    }
    if (control.inputType === 'select' && control.valueRange !== null) {
      return (
        <Form.Group
          className="mb-3"
          controlId={`addForm.${control.name}Input`}
          key={control.name}
        >
          <Form.Label>{control.title}</Form.Label>
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
        </Form.Group>
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
          {formControls.map((control, controlIdx) =>
            control.type === 'basic'
              ? getInputComponent(
                  control.control as BasicFormControl,
                  controlIdx
                )
              : (control.control as ReactElement<any, any>)
          )}
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
