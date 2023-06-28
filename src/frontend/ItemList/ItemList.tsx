import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Item from '../../types/Item';
import Product from '../../types/Product';
import Shop from '../../types/Shop';
import Unit from '../../types/Unit';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';


export default function ItemList() {
    const [items, setItems] = useState<Item[]>([] as Item[]);
    const [shops, setShops] = useState<Shop[]>([] as Shop[]);
    const [products, setProducts] = useState<Product[]>([] as Product[]);
    const [units, setUnits] = useState<Unit[]>([] as Unit[]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item>({
        item_id: -1,
        item_quantity: 0,
        item_price: 0,
        item_product: -1,
        product_name: "",
        item_unit: -1,
        unit_display_name: "",
        item_shop: -1,
        shop_display_name: "",
        item_date: ""
    });

    useEffect(() => {
        window.electron.ipcRenderer.once('fetch-items', (items) => {
            setItems(items as Item[]);
        });
        window.electron.ipcRenderer.sendMessage('fetch-items', []);
    }, []);

    const fetchModalData = () => {
        window.electron.ipcRenderer.once('fetch-products', (products) => {
            setProducts(products as Product[]);
        });
        window.electron.ipcRenderer.once('fetch-shops', (shops) => {
            setShops(shops as Shop[]);
        });
        window.electron.ipcRenderer.once('fetch-units', (units) => {
            setUnits(units as Unit[]);
        });
        window.electron.ipcRenderer.sendMessage('fetch-products', []);
        window.electron.ipcRenderer.sendMessage('fetch-shops', []);
        window.electron.ipcRenderer.sendMessage('fetch-units', []);
    }

    const addItem = () => {
        fetchModalData();
        setShowAddModal(true);
    }

    const editItem = (item : Item) => {
        fetchModalData();
        setSelectedItem(item);
        setShowEditModal(true);
    }

    const deleteItem = (item : Item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    }

    const confirmAdd = (newItem : Item) => {
        window.electron.ipcRenderer.once('add-item', (newId) => {
            const id = newId as number;
            if (id > -1) {
                newItem.item_id = id;
                setItems([...items, newItem]);
            }
        });
        window.electron.ipcRenderer.sendMessage('add-item', [newItem]);
        setShowAddModal(false);
    }

    const confirmEdit = (editedItem : Item) => {
        window.electron.ipcRenderer.once('edit-item', (edited) => {
            if (edited) {
                const index = items.findIndex((item) => item.item_id === editedItem.item_id);
                if (index > -1) {
                    const itemsCopy = [...items];
                    itemsCopy[index] = editedItem;
                    setItems(itemsCopy);
                }
            }
        });
        window.electron.ipcRenderer.sendMessage('edit-item', [editedItem]);
        setShowEditModal(false);
    }

    const confirmDelete = (itemId : number) => {
        window.electron.ipcRenderer.once('delete-item', (deleted) => {
            if (deleted) {
                setItems(items.filter((item) => item.item_id !== itemId));
            }
        });
        window.electron.ipcRenderer.sendMessage('delete-item', [itemId]);
        setShowDeleteModal(false);
    }

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Items</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success" onClick={() => addItem()}>Add New Item</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table hover>
                    <thead className="table-dark">
                        <tr>
                            <td>Product Name</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>Shop</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr key={item?.item_id}>
                                    <td>{item?.product_name}</td>
                                    <td>{item?.item_quantity} {item?.unit_display_name}</td>
                                    <td>{item?.item_price} zł</td>
                                    <td>{item?.shop_display_name}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => editItem(item)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteItem(item)}>Remove</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <AddModal
                visible={showAddModal}
                setVisible={setShowAddModal}
                shops={shops}
                units={units}
                products={products}
                handleSubmit={confirmAdd}
            />
            <DeleteModal
                visible={showDeleteModal}
                setVisible={setShowDeleteModal}
                selectedItem={selectedItem}
                handleSubmit={confirmDelete}
            />
            <EditModal 
                visible={showEditModal}
                setVisible={setShowEditModal}
                selectedItem={selectedItem}
                shops={shops}
                units={units}
                products={products}
                handleSubmit={confirmEdit}
            />
        </>
    );
}
