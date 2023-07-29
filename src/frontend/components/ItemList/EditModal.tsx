import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { EditItemModalProps } from '../../types/EditModalProps';
import { defaultItem, Item } from '../../types/Item';

export default function EditModal({
  visible,
  setVisible,
  selectedItem,
  shops,
  units,
  products,
  handleSubmit,
}: EditItemModalProps) {
  const [item, setItem] = useState<Item>(defaultItem);

  useEffect(() => {
    setItem(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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
              value={item?.itemProductName}
              name="itemProductName"
              onChange={(e) =>
                setItem({ ...item, itemProductName: e.target.value })
              }
            >
              {products.map((product) => (
                <option key={product?.product_id}>
                  {product?.product_name}
                </option>
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
                  value={item?.itemQuantity}
                  onChange={(e) =>
                    setItem({ ...item, itemQuantity: Number(e.target.value) })
                  }
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={item?.itemUnitDisplayName}
                >
                  {units.map((unit) => (
                    <Dropdown.Item
                      key={unit?.unit_id}
                      name="unit_name"
                      onClick={(e) => {
                        const value = (e.target as HTMLElement).textContent;
                        if (value)
                          setItem({ ...item, itemUnitDisplayName: value });
                      }}
                    >
                      {unit?.unit_display_name}
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
                  name="item_price"
                  value={item?.itemPrice}
                  onChange={(e) =>
                    setItem({ ...item, itemPrice: Number(e.target.value) })
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
              value={item?.itemShopDisplayName}
              name="shop_name"
              onChange={(e) =>
                setItem({ ...item, itemShopDisplayName: e.target.value })
              }
            >
              {shops.map((shop) => (
                <option key={shop?.shop_id}>{shop?.shop_display_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemForm.DateInput">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="item_date"
              value={convertDate(item?.itemDate)}
              onChange={(e) =>
                setItem({ ...item, itemDate: convertDate(e.target.value) })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={() => handleSubmit(item)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
