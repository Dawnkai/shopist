import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useSelector, useDispatch } from 'react-redux';
import { ItemModalProps } from '../../../types/Item';
import { RootState } from '../../../main/store';

import {
  setItemPrice,
  setItemProductName,
  setItemUnitDisplayName,
  setItemShopDisplayName,
  setItemDate,
  setItemQuantity,
} from '../../slices/itemSlice';

export default function AddItemModal({
  visible,
  setVisible,
  handleSubmit,
}: ItemModalProps) {
  const newItem = useSelector((state: RootState) => state.item.selectedItem);
  const products = useSelector((state: RootState) => state.product.products);
  const shops = useSelector((state: RootState) => state.shop.shops);
  const units = useSelector((state: RootState) => state.unit.units);
  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);

  const formValid = () => {
    if (newItem.itemDate === '') return false;
    if (newItem.itemPrice <= 0) return false;
    if (newItem.itemProductName === '') return false;
    if (newItem.itemQuantity <= 0) return false;
    if (newItem.itemShopDisplayName === '') return false;
    if (newItem.itemUnitDisplayName === '') return false;
    return true;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Select
              aria-label="product-select"
              value={newItem?.itemProductName}
              name="itemProductName"
              onChange={(e) => dispatch(setItemProductName(e.target.value))}
            >
              <option aria-label="empty-product" />
              {products.map((product) => (
                <option key={product?.productId}>{product?.productName}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Quantity</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="itemQuantity"
                  value={newItem?.itemQuantity}
                  min={0}
                  onChange={(e) =>
                    dispatch(setItemQuantity(Number(e.target.value)))
                  }
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={newItem?.itemUnitDisplayName}
                >
                  {units.map((unit) => (
                    <Dropdown.Item
                      key={unit?.unit_id}
                      name="itemUnitDisplayName"
                      onClick={(e) => {
                        const value = (e.target as HTMLElement).textContent;
                        if (value) dispatch(setItemUnitDisplayName(value));
                      }}
                    >
                      {unit?.unitDisplayName}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  step="0.01"
                  lang="en"
                  name="item_price"
                  min={0}
                  value={newItem?.itemPrice}
                  onChange={(e) =>
                    dispatch(setItemPrice(Number(e.target.value)))
                  }
                />
                <InputGroup.Text>zł</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Shop</Form.Label>
            <Form.Select
              aria-label="shop-select"
              value={newItem?.itemShopDisplayName}
              name="itemShopDisplayName"
              onChange={(e) => dispatch(setItemShopDisplayName(e.target.value))}
            >
              <option aria-label="empty-shop" />
              {shops.map((shop) => (
                <option key={shop?.shopId}>{shop?.shopDisplayName}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemForm.DateInput">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="itemDate"
              value={newItem?.itemDate}
              onChange={(e) => dispatch(setItemDate(e.target.value))}
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
            if (formValid()) handleSubmit(newItem);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
