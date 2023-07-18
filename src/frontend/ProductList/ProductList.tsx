import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Product from '../../types/Product';

import DeleteModal from './DeleteModal';

import { FormControl } from '../../types/ModalProps';
import ModalForm from '../ModalForm';
import getProductControls from '../ModalProps/getProductControls';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    product_id: -1,
    product_name: '',
    product_description: '',
  });

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-products', (productsList) => {
      setProducts(productsList as Product[]);
    });
    window.electron.ipcRenderer.sendMessage('fetch-products', []);
  }, []);

  const extractProduct = (controls: FormControl[]) => {
    const values = controls.reduce(
      (acc: Product, { name, value }) => {
        acc[name] = value;
        return acc;
      },
      {
        product_id: 0,
        product_name: '',
        product_description: '',
      }
    );
    return values;
  };

  const addProduct = () => {
    setShowAddModal(true);
  };

  const deleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const editProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const confirmAdd = (controls: FormControl[]) => {
    const values = extractProduct(controls);
    window.electron.ipcRenderer.once('add-product', (newId) => {
      const id = newId as number;
      if (id > -1) {
        values.product_id = id;
        setProducts([...products, values as Product]);
      }
    });
    window.electron.ipcRenderer.sendMessage('add-product', [values]);
    setShowAddModal(false);
  };

  const confirmDelete = (productId: number) => {
    window.electron.ipcRenderer.once('delete-product', (deleted) => {
      if (deleted) {
        setProducts(
          products.filter((product) => product.product_id !== productId)
        );
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-product', [productId]);
    setShowDeleteModal(false);
  };

  const confirmEdit = (controls: FormControl[]) => {
    const values = extractProduct(controls);
    values.product_id = selectedProduct.product_id;
    window.electron.ipcRenderer.once('edit-product', (edited) => {
      if (edited) {
        const index = products.findIndex(
          (product) => product.product_id === values.product_id
        );
        if (index > -1) {
          const productsCopy = [...products];
          productsCopy[index] = values;
          setProducts(productsCopy);
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-product', [values]);
    setShowEditModal(false);
  };

  return (
    <>
      <Card>
        <Card.Header className="text-white bg-primary">
          <div className="float-start">
            <h3>
              List of <b>Products</b>
            </h3>
          </div>
          <div className="float-end">
            <Button variant="success" onClick={addProduct}>
              Add New Product
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className="table-dark">
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product?.product_id}>
                  <td>{product?.product_name}</td>
                  <td>{product?.product_description}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <ModalForm
        visible={showAddModal}
        setVisible={setShowAddModal}
        handleSubmit={confirmAdd}
        controls={getProductControls(undefined)}
        title="Add new product"
      />
      <DeleteModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        selectedProduct={selectedProduct}
        handleSubmit={confirmDelete}
      />
      <ModalForm
        visible={showEditModal}
        setVisible={setShowEditModal}
        handleSubmit={confirmEdit}
        controls={getProductControls(selectedProduct)}
        title="Edit product"
      />
    </>
  );
}
