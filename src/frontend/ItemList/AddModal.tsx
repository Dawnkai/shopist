import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { AddItemModalProps } from '../../types/AddModalProps';
import Item from '../../types/Item';
import FormControlElement from '../../types/FormControlElement';

export default function AddModal({
  visible,
  setVisible,
  shops,
  units,
  products,
  handleSubmit,
}: AddItemModalProps) {
  const [newItem, setNewItem] = useState<Item>({
    item_quantity: 0,
    item_price: 0,
    item_product: products[0] !== undefined ? products[0].product_id : -1,
    product_name: products[0] !== undefined ? products[0].product_name : '',
    item_unit: units[0] !== undefined ? units[0].unit_id : -1,
    unit_display_name: units[0] !== undefined ? units[0].unit_display_name : '',
    item_shop: shops[0] !== undefined ? shops[0].shop_id : -1,
    shop_display_name: shops[0] !== undefined ? shops[0].shop_display_name : '',
    item_date: new Date().toJSON().slice(0, 10).toString(),
  });

  useEffect(() => {
    setNewItem({
      item_quantity: 0,
      item_price: 0,
      item_product: products[0] !== undefined ? products[0].product_id : -1,
      product_name: products[0] !== undefined ? products[0].product_name : '',
      item_unit: units[0] !== undefined ? units[0].unit_id : -1,
      unit_display_name:
        units[0] !== undefined ? units[0].unit_display_name : '',
      item_shop: shops[0] !== undefined ? shops[0].shop_id : -1,
      shop_display_name:
        shops[0] !== undefined ? shops[0].shop_display_name : '',
      item_date: new Date().toJSON().slice(0, 10).toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => setVisible(false);

  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mapValueToId = (sourceName: string, value: string | null) => {
    if (value === null) return -1;
    let id: number | undefined;
    if (sourceName === 'products') {
      id = products.filter((product) => product.product_name === value)[0]
        .product_id;
    } else if (sourceName === 'shops') {
      id = shops.filter((shop) => shop.shop_display_name === value)[0].shop_id;
    } else {
      id = units.filter((unit) => unit.unit_display_name === value)[0].unit_id;
    }
    if (id === undefined) return -1;
    return id;
  };

  const handleChangeSelect = (
    e: React.ChangeEvent<FormControlElement>,
    idFieldName: string,
    displayFieldName: string,
    sourceName: string
  ) => {
    const idValue = mapValueToId(sourceName, e.target.value);
    setNewItem((prev) => ({
      ...prev,
      [idFieldName]: idValue,
      [displayFieldName]: e.target.value,
    }));
  };

  const handleChangeDropdown = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    idFieldName: string,
    displayFieldName: string,
    sourceName: string
  ) => {
    const displayValue = (e.target as HTMLElement).textContent;
    const idValue = mapValueToId(sourceName, displayValue);
    setNewItem((prev) => ({
      ...prev,
      [idFieldName]: idValue,
      [displayFieldName]: displayValue,
    }));
  };

  const formValid = () => {
    if (newItem.item_product === -1) return false;
    if (newItem.item_unit === -1) return false;
    if (newItem.item_shop === -1) return false;
    if (newItem.item_quantity < 1) return false;
    if (newItem.item_price < 0) return false;
    return true;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="itemForm.NameInput">
            <Form.Label>Product</Form.Label>
            <Form.Select
              aria-label="product-select"
              value={newItem?.product_name}
              name="product_name"
              onChange={(e) => {
                handleChangeSelect(
                  e,
                  'item_product',
                  'product_name',
                  'products'
                );
              }}
            >
              <option aria-label="empty-product" />
              {products.map((product) => (
                <option key={product?.product_id}>
                  {product?.product_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="itemForm.QuantityInput">
              <Form.Label>Quantity</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name="item_quantity"
                  value={newItem?.item_quantity}
                  min={0}
                  onChange={(e) => handleChange(e)}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={newItem?.unit_display_name}
                >
                  {units.map((unit) => (
                    <Dropdown.Item
                      key={unit?.unit_id}
                      name="unit_name"
                      onClick={(e) =>
                        handleChangeDropdown(
                          e,
                          'item_unit',
                          'unit_name',
                          'units'
                        )
                      }
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
                  min={0}
                  value={newItem?.item_price}
                  onChange={(e) => handleChange(e)}
                />
                <InputGroup.Text>zł</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="itemForm.ShopInput">
            <Form.Label>Shop</Form.Label>
            <Form.Select
              aria-label="shop-select"
              value={newItem?.shop_display_name}
              name="shop_name"
              onChange={(e) =>
                handleChangeSelect(e, 'item_shop', 'shop_name', 'shops')
              }
            >
              <option aria-label="empty-shop" />
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
              value={newItem?.item_date}
              onChange={(e) => handleChange(e)}
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
