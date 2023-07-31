import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

import { ProductModalProps } from '../../../types/Product';
import { RootState } from '../../../main/store';

export default function DeleteProductModal({
  visible,
  setVisible,
  handleSubmit,
}: ProductModalProps) {
  const handleClose = () => setVisible(false);
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this product?
        <hr className="hr" />
        <Table striped bordered size="sm">
          <tbody>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>{selectedProduct.productName}</td>
            </tr>
            <tr>
              <td>
                <b>Description</b>
              </td>
              <td>{selectedProduct.productDescription}</td>
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
            if (selectedProduct?.productId !== undefined)
              handleSubmit(selectedProduct);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
