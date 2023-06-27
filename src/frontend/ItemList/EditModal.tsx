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
import Item from '../../types/Item';
import FormControlElement from '../../types/FormControlElement';

export default function EditModal({visible, setVisible, selectedItem, shops, units, products, handleSubmit}:EditItemModalProps) {

    const [item, setItem] = useState<Item>({
        item_id: -1,
        item_quantity: 0,
        item_price: 0,
        item_product: -1,
        product_name: "",
        item_unit: -1,
        unit_display_name: "",
        item_shop: -1,
        shop_display_name: ""
    });

    useEffect(() => {
        setItem(selectedItem);
    }, [visible]);

    const handleClose = () => setVisible(false);

    const handleChange = (e : React.ChangeEvent<FormControlElement>) => {
        setItem(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const mapValueToId = (source_name : string, value : string | null) => {
        if (value === null) return -1;
        let id : number | undefined;
        if (source_name === "products") {
            id = products.filter(product => product.product_name == value)[0].product_id;
        } else if (source_name === "shops") {
            id = shops.filter(shop => shop.shop_display_name == value)[0].shop_id;
        } else {
            id = units.filter(unit => unit.unit_display_name == value)[0].unit_id;
        }
        if (id === undefined) return -1;
        return id;
    }

    const handleChangeSelect = (
    e : React.ChangeEvent<FormControlElement>,
    id_field_name : string,
    display_field_name : string,
    source_name : string) => {
        const id_value = mapValueToId(source_name, e.target.value);
        setItem(prev => ({...prev, [id_field_name]: id_value, [display_field_name]: e.target.value}));
    }

    const handleChangeDropdown = (
    e : React.MouseEvent<HTMLElement, MouseEvent>,
    id_field_name : string,
    display_field_name : string,
    source_name : string) => {
        const display_value = (e.target as HTMLElement).textContent
        const id_value = mapValueToId(source_name, display_value);
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
                            onChange={(e) => handleChangeSelect(e, "item_product", "product_name", "products")}
                        >
                            {products.map((product) => <option key={product?.product_id}>{product?.product_name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="itemForm.QuantityInput">
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" name="item_quantity" value={item?.item_quantity} onChange={(e) => handleChange(e)}/>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={item?.unit_display_name}
                                >
                                    {units.map((unit) => 
                                    <Dropdown.Item
                                        key={unit?.unit_id}
                                        name="unit_name"
                                        onClick={(e) => handleChangeDropdown(e, "item_unit", "unit_name", "units")}
                                    >{unit?.unit_display_name}</Dropdown.Item>)}
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
                            value={item?.shop_display_name}
                            name="shop_name"
                            onChange={(e) => handleChangeSelect(e, "item_shop", "shop_name", "shops")}
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
