import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import Product from '../../types/Product';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

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

  const confirmAdd = (newProduct: Product) => {
    window.electron.ipcRenderer.once('add-product', (newId) => {
      const id = newId as number;
      if (id > -1) {
        newProduct.product_id = id;
        setProducts([...products, newProduct]);
      }
    });
    window.electron.ipcRenderer.sendMessage('add-product', [newProduct]);
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

  const confirmEdit = (editedProduct: Product) => {
    window.electron.ipcRenderer.once('edit-product', (edited) => {
      if (edited) {
        const index = products.findIndex(
          (product) => product.product_id === editedProduct.product_id
        );
        if (index > -1) {
          const productsCopy = [...products];
          productsCopy[index] = editedProduct;
          setProducts(productsCopy);
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-product', [editedProduct]);
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
      <AddModal
        visible={showAddModal}
        setVisible={setShowAddModal}
        handleSubmit={confirmAdd}
      />
      <DeleteModal
        visible={showDeleteModal}
        setVisible={setShowDeleteModal}
        selectedProduct={selectedProduct}
        handleSubmit={confirmDelete}
      />
      <EditModal
        visible={showEditModal}
        setVisible={setShowEditModal}
        selectedProduct={selectedProduct}
        handleSubmit={confirmEdit}
      />
    </>
  );
}
