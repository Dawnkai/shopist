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

export default function EditItemModal({
  visible,
  setVisible,
  handleSubmit,
}: ItemModalProps) {
  const selectedItem = useSelector(
    (state: RootState) => state.item.selectedItem
  );
  const products = useSelector((state: RootState) => state.product.products);
  const shops = useSelector((state: RootState) => state.shop.shops);
  const units = useSelector((state: RootState) => state.unit.units);
  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);

  const convertDate = (date: any) => {
    if (date instanceof Date) {
      return date.toJSON().slice(0, 10).toString();
    }
    if (date === '' || date === undefined) {
      return new Date().toJSON().slice(0, 10).toString();
    }
    return date;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Select
              aria-label="product-select"
              value={selectedItem?.itemProductName}
              name="itemProductName"
              onChange={(e) => dispatch(setItemProductName(e.target.value))}
            >
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
                  value={selectedItem?.itemQuantity}
                  onChange={(e) =>
                    dispatch(setItemQuantity(Number(e.target.value)))
                  }
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={selectedItem?.itemUnitDisplayName}
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
            <Form.Group as={Col} controlId="itemForm.PriceInput">
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  step="0.01"
                  lang="en"
                  name="itemPrice"
                  value={selectedItem?.itemPrice}
                  onChange={(e) =>
                    dispatch(setItemPrice(Number(e.target.value)))
                  }
                />
                <InputGroup.Text>zł</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="itemForm.ShopInput">
            <Form.Label>Shop</Form.Label>
            <Form.Select
              aria-label="shop-select"
              value={selectedItem?.itemShopDisplayName}
              name="shop_name"
              onChange={(e) => setItemShopDisplayName(e.target.value)}
            >
              {shops.map((shop) => (
                <option key={shop?.shopId}>{shop?.shopDisplayName}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemForm.DateInput">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="item_date"
              value={convertDate(selectedItem?.itemDate)}
              onChange={(e) => setItemDate(convertDate(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={() => handleSubmit(selectedItem)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
