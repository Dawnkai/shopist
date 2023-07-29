import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { Product, defaultProduct } from '../../types/Product';

import DeleteModal from './DeleteModal';

import { BasicFormControl, FormControl } from '../../types/ModalProps';
import ModalForm from '../../ModalForm';
import getProductControls from '../ModalControls/getProductControls';
import { RootState } from '../../../main/store';

import {
  addProduct,
  deleteProduct,
  setProducts,
  setSelectedProduct,
} from '../../slices/productSlice';

export default function ProductList() {
  const products = useSelector((state: RootState) => state.product.products);
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
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

  const extractProduct = (controls: FormControl[]) => {
    const values = controls.reduce(
      (acc: Product, { control }) => {
        acc[(control as BasicFormControl).name] = (
          control as BasicFormControl
        ).value;
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

  const confirmAdd = (controls: FormControl[]) => {
    const values = extractProduct(controls);
    delete values.product_id;
    window.electron.ipcRenderer.once('add-product', (newId) => {
      const id = newId as number;
      if (id > -1) {
        values.product_id = id;
        dispatch(addProduct(values));
      }
    });
    window.electron.ipcRenderer.sendMessage('add-product', [values]);
    setIsShowAddModal(false);
  };

  const confirmDelete = (productId: number) => {
    window.electron.ipcRenderer.once('delete-product', (isDeleted) => {
      if (isDeleted) {
        dispatch(deleteProduct(productId));
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-product', [productId]);
    setIsShowDeleteModal(false);
  };

  const confirmEdit = (controls: FormControl[]) => {
    const values = extractProduct(controls);
    values.product_id = selectedProduct.product_id;
    window.electron.ipcRenderer.once('edit-product', (editedProduct) => {
      if (editedProduct) {
        const index = products.findIndex(
          (product) => product.product_id === values.product_id
        );
        if (index > -1) {
          const productsCopy = [...products];
          productsCopy[index] = values;
          dispatch(setProducts(productsCopy));
        }
      }
    });
    window.electron.ipcRenderer.sendMessage('edit-product', [values]);
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
                <tr key={product?.product_id}>
                  <td>{product?.product_name}</td>
                  <td>{product?.product_description}</td>
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
      <ModalForm
        visible={isShowAddModal}
        setVisible={setIsShowAddModal}
        handleSubmit={confirmAdd}
        controls={getProductControls(selectedProduct)}
        title="Add new product"
      />
      <DeleteModal
        visible={isShowDeleteModal}
        setVisible={setIsShowDeleteModal}
        selectedProduct={selectedProduct}
        handleSubmit={confirmDelete}
      />
      <ModalForm
        visible={isShowEditModal}
        setVisible={setIsShowEditModal}
        handleSubmit={confirmEdit}
        controls={getProductControls(selectedProduct)}
        title="Edit product"
      />
    </>
  );
}
