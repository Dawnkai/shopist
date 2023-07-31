import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { ShopModalProps } from '../../../types/Shop';
import { RootState } from '../../../main/store';

import {
  setShopDisplayName,
  setShopName,
  setShopDescription,
  setShopAddress,
} from '../../slices/shopSlice';

export default function AddShopModal({
  visible,
  setVisible,
  handleSubmit,
}: ShopModalProps) {
  const newShop = useSelector((state: RootState) => state.shop.selectedShop);
  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);

  const formValid = () => {
    if (newShop.shopDisplayName === '') return false;
    if (newShop.shopName === '') return false;
    return true;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add shop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Shop display name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shop display name"
              name="shop_display_name"
              value={newShop?.shopDisplayName}
              onChange={(e) => dispatch(setShopDisplayName(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Shop name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shop full name"
              name="shop_name"
              value={newShop?.shopName}
              onChange={(e) => dispatch(setShopName(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Shop description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shop description"
              name="shop_description"
              value={newShop?.shopDescription}
              onChange={(e) => dispatch(setShopDescription(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Shop address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shop address"
              name="shop_address"
              value={newShop?.shopAddress}
              onChange={(e) => dispatch(setShopAddress(e.target.value))}
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
            if (formValid()) handleSubmit(newShop);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
