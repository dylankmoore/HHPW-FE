import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Alert, Modal,
} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { createNewOrder, getItems, addItemToOrder } from '../api/orderData';

const CreateOrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    email: '',
    customerPhone: '',
    isPhone: false,
  });
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getItems().then(setItems).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSelectItem = (itemId) => {
    const itemToAdd = items.find((item) => item.itemId === itemId);
    setSelectedItems([...selectedItems, itemToAdd]);
    setShowItemModal(false);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter((item) => item.itemId !== itemId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrder = await createNewOrder(orderDetails);
      await Promise.all(selectedItems.map((item) => addItemToOrder(newOrder.orderId, item.itemId)));
      setSubmissionStatus({ success: true, message: 'Order created successfully!' });
      router.push(`/orders/${newOrder.orderId}`);
    } catch (error) {
      setSubmissionStatus({ success: false, message: error.message });
    }
  };

  return (
    <>
      <h1>Create Order</h1><hr /><br />
      <div id="createformpage"><br />
        {submissionStatus && (
          <Alert variant={submissionStatus.success ? 'success' : 'danger'}>
            {submissionStatus.message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Name Input */}
          <Form.Group>
            <Form.Label>Customer Name:</Form.Label>
            <Form.Control
              type="text"
              name="customerName"
              value={orderDetails.customerName}
              onChange={handleChange}
              required
            />
          </Form.Group><br />

          {/* Email Input */}
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={orderDetails.email}
              onChange={handleChange}
              required
            />
          </Form.Group><br />

          {/* Phone Number Input */}
          <Form.Group>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              name="customerPhone"
              value={orderDetails.customerPhone}
              onChange={handleChange}
              required
            />
          </Form.Group><br />

          {/* Order Type Select */}
          <Form.Group>
            <Form.Label>Order Type:</Form.Label>
            <Form.Select
              name="isPhone"
              onChange={(e) => handleChange({ target: { name: 'isPhone', value: e.target.value === 'phone' } })}
              required
            >
              <option value="">Select order type:</option>
              <option value="phone">Phone</option>
              <option value="inPerson">In-Person</option>
            </Form.Select>
          </Form.Group><br />

          <Button type="button" className="btn btn-secondary" onClick={() => setShowItemModal(true)}>Add Items</Button>
          <ListGroup><br />
            {selectedItems.map((item) => (
              <ListGroup.Item key={item.itemId}>
                {item.name} - ${item.price.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;
                <Button id="remove" size="sm" onClick={() => handleRemoveItem(item.itemId)}>REMOVE</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <br />

          {/* Submit Button */}
          <Button type="submit" className="copy-btn raise" id="createsubmit">Create Order</Button>
        </Form>

        {/* Modal for selecting items */}
        <Modal show={showItemModal} onHide={() => setShowItemModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Select Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {items.map((item) => (
                <ListGroup.Item key={item.itemId}>
                  {item.name} - ${item.price.toFixed(2)} &nbsp;
                  <Button id="add" size="sm" onClick={() => handleSelectItem(item.itemId)}>Add</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
      </div><br /><br />
      <footer style={{
        padding: '20px 10px',
        textAlign: 'center',
        borderTop: '1px solid black',
        width: '100%',
        fontFamily: 'monospace',
        fontSize: '14px',
      }}
      >
        HIP HOP, PIZZA, & WANGS, 237 MUSIC ROW, NASHVILLE, TN, 37203 - HHPWFOREVER@GMAIL.COM
      </footer>
    </>
  );
};

export default CreateOrderForm;
