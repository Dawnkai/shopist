import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { ProductModalProps } from '../../../types/Product';
import { RootState } from '../../../main/store';

import {
  setProductName,
  setProductDescription,
} from '../../slices/productSlice';

export default function AddProductModal({
  visible,
  setVisible,
  handleSubmit,
}: ProductModalProps) {
  const newProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);

  const formValid = () => {
    if (newProduct.productName === '') return false;
    return true;
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product name"
              name="product_name"
              value={newProduct?.productName}
              onChange={(e) => dispatch(setProductName(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product description"
              name="product_description"
              value={newProduct?.productDescription}
              onChange={(e) => dispatch(setProductDescription(e.target.value))}
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
            if (formValid()) handleSubmit(newProduct);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
