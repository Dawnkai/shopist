import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

import { ItemModalProps } from '../../../types/Item';
import { RootState } from '../../../main/store';

export default function DeleteItemModal({
  visible,
  setVisible,
  handleSubmit,
}: ItemModalProps) {
  const handleClose = () => setVisible(false);
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this item?
        <hr className="hr" />
        <Table striped bordered size="sm">
          <tbody>
            <tr>
              <td>
                <b>Product</b>
              </td>
              <td>{selectedItem.itemProductName}</td>
            </tr>
            <tr>
              <td>
                <b>Quantity</b>
              </td>
              <td>
                {selectedItem.itemQuantity} {selectedItem.itemUnitDisplayName}
              </td>
            </tr>
            <tr>
              <td>
                <b>Date</b>
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <b>Shop</b>
              </td>
              <td>{selectedItem.itemShopDisplayName}</td>
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
            if (selectedItem?.itemId !== undefined) handleSubmit(selectedItem);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
