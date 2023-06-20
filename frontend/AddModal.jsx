import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function AddModal({visible, setVisible, shops, units, products, handleSubmit}) {

    useEffect(() => {
        setNewItem({
            item_quantity: 0,
            item_price: 0,
            product_name: products[0] !== undefined ? products[0]["id"] : -1,
            item_product: products[0] !== undefined ? products[0]["name"] : "",
            item_unit: units[0] !== undefined ? units[0]["id"] : -1,
            unit_name: units[0] !== undefined ? units[0]["name"] : "",
            item_shop: shops[0] !== undefined ? shops[0]["id"] : -1,
            shop_name: shops[0] !== undefined ? shops[0]["name"] : ""
        });
    }, [visible])

    const [newItem, setNewItem] = useState({
        item_quantity: 0,
        item_price: 0,
        product_name: products[0] !== undefined ? products[0]["id"] : -1,
        item_product: products[0] !== undefined ? products[0]["name"] : "",
        item_unit: units[0] !== undefined ? units[0]["id"] : -1,
        unit_name: units[0] !== undefined ? units[0]["name"] : "",
        item_shop: shops[0] !== undefined ? shops[0]["id"] : -1,
        shop_name: shops[0] !== undefined ? shops[0]["name"] : ""
    });

    const handleClose = () => setVisible(false);

    const handleChange = (e) => {
        setNewItem(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    // Update field with display value and also update the field with id of said display value
    const handleChangeAndConvert = (e, id_field, display_field, source) => {
        const display_value = e.target.name === "unit_name" ? e.target.textContent : e.target.value;
        const id_value = source.filter(value => value.name == display_value)[0]["id"];
        setNewItem(prev => ({...prev, [id_field]: id_value, [display_field]: display_value}));
    }

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
                            onChange={(e) => handleChangeAndConvert(e, "item_product", "product_name", products)}
                        >
                            {products.map((product) => <option key={product?.id}>{product?.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="itemForm.QuantityInput">
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" name="item_quantity" value={newItem?.item_quantity} onChange={(e) => handleChange(e)}/>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={newItem?.unit_name}
                                >
                                    {units.map((unit) => 
                                    <Dropdown.Item
                                        key={unit?.id}
                                        name="unit_name"
                                        onClick={(e) => handleChangeAndConvert(e, "item_unit", "unit_name", units)}
                                    >{unit?.name}</Dropdown.Item>)}
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
                            value={newItem?.shop_name}
                            name="shop_name"
                            onChange={(e) => handleChangeAndConvert(e, "item_shop", "shop_name", shops)}
                        >
                            {shops.map((shop) => <option key={shop?.id}>{shop?.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => console.log(newItem)}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
