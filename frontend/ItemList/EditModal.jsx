import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function EditModal({visible, setVisible, selectedItem, shops, units, products, handleSubmit}) {

    const [item, setItem] = useState({
        item_id: -1,
        item_quantity: 0,
        item_price: 0,
        item_product: -1,
        product_name: "",
        item_unit: -1,
        unit_name: "",
        item_shop: -1,
        shop_name: ""
    });

    useEffect(() => {
        setItem(selectedItem);
    }, [visible]);

    const handleClose = () => setVisible(false);

    const handleChange = (e) => {
        setItem(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    // Update field with display value and also update the field with id of said display value
    // id_field_name - name of id field in current state
    // display_field_name - name of display field connected to id field in current state
    // source_field - name of the id field in the SOURCE (shop_id, product_id, etc)
    // source - data used to fill the fields in current state (products, shops, etc)
    const handleChangeAndConvert = (e, id_field_name, display_field_name, source_field, source) => {
        const display_value = e.target.name === "unit_name" ? e.target.textContent : e.target.value;
        const id_value = source.filter(value => value.name == display_value)[0][source_field];
        setItem(prev => ({...prev, [id_field_name]: id_value, [display_field_name]: display_value}));
    }

    return (
        <Modal show={visible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="itemForm.NameInput">
                        <Form.Label>Product</Form.Label>
                        <Form.Select 
                            aria-label="product-select"
                            value={item?.product_name}
                            name="product_name"
                            onChange={(e) => handleChangeAndConvert(e, "item_product", "product_name", "product_id", products)}
                        >
                            {products.map((product) => <option key={product?.id}>{product?.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="itemForm.QuantityInput">
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" name="item_quantity" value={item?.item_quantity} onChange={(e) => handleChange(e)}/>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={item?.unit_name}
                                >
                                    {units.map((unit) => 
                                    <Dropdown.Item
                                        key={unit?.id}
                                        name="unit_name"
                                        onClick={(e) => handleChangeAndConvert(e, "item_unit", "unit_name", "unit_id", units)}
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
                                    value={item?.item_price}
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
                            value={item?.shop_name}
                            name="shop_name"
                            onChange={(e) => handleChangeAndConvert(e, "item_shop", "shop_name", "shop_id", shops)}
                        >
                            {shops.map((shop) => <option key={shop?.shop_id}>{shop?.shop_display_name}</option>)}
                        </Form.Select>
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
