import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

import { ShopModalProps } from '../../../types/Shop';
import { RootState } from '../../../main/store';

export default function DeleteShopModal({
  visible,
  setVisible,
  handleSubmit,
}: ShopModalProps) {
  const handleClose = () => setVisible(false);
  const selectedShop = useSelector(
    (state: RootState) => state.shop.selectedShop
  );

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete shop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this shop?
        <hr className="hr" />
        <Table striped bordered size="sm">
          <tbody>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>{selectedShop.shopDisplayName}</td>
            </tr>
            <tr>
              <td>
                <b>Full name</b>
              </td>
              <td>{selectedShop.shopName}</td>
            </tr>
            <tr>
              <td>
                <b>Description</b>
              </td>
              <td>{selectedShop.shopDescription}</td>
            </tr>
            <tr>
              <td>
                <b>Address</b>
              </td>
              <td>{selectedShop.shopAddress}</td>
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
            if (selectedShop?.shopId !== undefined) handleSubmit(selectedShop);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
