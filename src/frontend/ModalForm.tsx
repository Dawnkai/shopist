import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FormControlElement from 'types/FormControlElement';
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

  const handleChange = (
    e: React.ChangeEvent<FormControlElement>,
    controlIdx: number
  ) => {
    const prevControls = [...formControls];
    prevControls[controlIdx].value = e.target.value;
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
                <Form.Label>{control.title}</Form.Label>
                <Form.Control
                  type={control.valueType}
                  placeholder={control.placeholder}
                  name={control.name}
                  value={control.value}
                  onChange={(e) => handleChange(e, controlIdx)}
                />
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
