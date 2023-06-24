import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import axios from 'axios';


export default function ItemList() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        axios.get('/api/shops').then((result) => setShops(result?.data)).catch((error) => console.log(error));
    }, []);

    return (
        <>
            <Card>
                <Card.Header className="text-white bg-primary">
                    <div className="float-start">
                        <h3>List of <b>Shops</b></h3>
                    </div>
                    <div className="float-end">
                        <Button variant="success">Add New Shop</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table hover>
                    <thead className="table-dark">
                        <tr>
                            <td>Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shops.map((shop) => (
                                <tr key={shop?.item_id}>
                                    <td>{shop?.name}</td>
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
        </>
    );
}
