import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { Product, defaultProduct } from '../../../types/Product';

import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';

import { RootState } from '../../../main/store';

import {
  addProduct,
  deleteProduct,
  setProducts,
  setSelectedProduct,
} from '../../slices/productSlice';

export default function ProductList() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.once('fetch-products', (productsList) => {
      dispatch(setProducts(productsList as Product[]));
    });
    window.electron.ipcRenderer.sendMessage('fetch-products', []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddModal = () => {
    dispatch(setSelectedProduct(defaultProduct));
    setIsShowAddModal(true);
  };

  const showDeleteModal = (product: Product) => {
    dispatch(setSelectedProduct(product));
    setIsShowDeleteModal(true);
  };

  const showEditModal = (product: Product) => {
    dispatch(setSelectedProduct(product));
    setIsShowEditModal(true);
  };

  const confirmAdd = (newProduct: Product) => {
    window.electron.ipcRenderer.once('add-product', (newId) => {
      const id = newId as number;
      if (id > -1) {
        newProduct.productId = id;
        dispatch(addProduct(newProduct));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-product', [newProduct]);
    setIsShowAddModal(false);
  };

  const confirmDelete = (product: Product) => {
    window.electron.ipcRenderer.once('delete-product', (isDeleted) => {
      if (isDeleted && product.productId) {
        dispatch(deleteProduct(product.productId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-product', [
      product.productId,
    ]);
    setIsShowDeleteModal(false);
  };

  const confirmEdit = (editedProduct: Product) => {
    window.electron.ipcRenderer.once('edit-product', (isEdited) => {
      if (isEdited) {
        const index = products.findIndex(
          (product) => product.productId === editedProduct.productId
        );
        if (index > -1) {
          const productsCopy = [...products];
          productsCopy[index] = editedProduct;
          dispatch(setProducts(productsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-product', [editedProduct]);
    setIsShowEditModal(false);
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
            <Button variant="success" onClick={showAddModal}>
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
                <tr key={product?.productId}>
                  <td>{product?.productName}</td>
                  <td>{product?.productDescription}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => showEditModal(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => showDeleteModal(product)}
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
      <AddProductModal
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
      />
      <DeleteProductModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        handleSubmit={confirmDelete}
      />
      <EditProductModal
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
      />
    </>
  );
}
