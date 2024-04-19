import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Alert, Modal, ListGroup,
} from 'react-bootstrap';
import {
  getOrderById, updateOrder, getItems, addItemToOrder, deleteOrderItem,
} from '../api/orderData';

const UpdateOrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerPhone: '',
    email: '',
    isPhone: false,
    items: [],
  });
  const [availableItems, setAvailableItems] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then((data) => {
          const formattedItems = data.items.map((item) => ({
            itemId: item.id,
            name: item.itemName,
            price: item.price,
          }));
          setOrderDetails({ ...data, items: formattedItems });
          getItems().then(setAvailableItems).catch(console.error);
        })
        .catch((error) => {
          console.error('Failed to fetch order details:', error);
          setSubmissionStatus({ success: false, message: 'Failed to fetch order details' });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async (itemId) => {
    const itemToAdd = availableItems.find((item) => item.itemId === itemId);
    await addItemToOrder(id, itemId);
    setOrderDetails((prev) => ({
      ...prev,
      items: [...prev.items, itemToAdd],
    }));
  };

  const handleRemoveItem = async (itemId) => {
    await deleteOrderItem(id, itemId);
    setOrderDetails((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.itemId !== itemId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateOrder(id, orderDetails)
      .then(() => {
        setSubmissionStatus({ success: true, message: 'Order updated successfully!' });
        router.push(`/orders/${id}`);
      })
      .catch((error) => {
        console.error('Failed to update the order:', error);
        setSubmissionStatus({ success: false, message: 'Failed to update the order' });
      });
  };

  return (
    <><br />
      <h1>Update Order</h1><hr />
      <div id="updateorderform">
        {submissionStatus && (
          <Alert variant={submissionStatus.success ? 'success' : 'danger'}>
            {submissionStatus.message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
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

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={orderDetails.email}
              onChange={handleChange}
              required
            />
          </Form.Group><br />

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

          <Form.Group>
            <Form.Label>Order Type:</Form.Label>
            <Form.Select
              name="isPhone"
              value={orderDetails.isPhone ? 'phone' : 'inPerson'}
              onChange={(e) => handleChange({ target: { name: 'isPhone', value: e.target.value === 'phone' } })}
              required
            >
              <option value="">Select order type:</option>
              <option value="phone">Phone</option>
              <option value="inPerson">In-Person</option>
            </Form.Select>
          </Form.Group><br />

          <Button variant="secondary" onClick={() => setShowItemModal(true)}>Manage Items</Button>
          <ListGroup><br />
            {orderDetails.items.map((item) => (
              <ListGroup.Item key={item.itemId}>
                {item.name} - ${item.price.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button id="remove" size="sm" onClick={() => handleRemoveItem(item.itemId)}>REMOVE</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <br />

          <Button type="submit" className="copy-btn raise" id="update-btn">Update Order</Button>
        </Form>

        {/* Modal for selecting items */}
        <Modal show={showItemModal} onHide={() => setShowItemModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {availableItems.map((item) => (
                <ListGroup.Item key={item.itemId}>
                  {item.name} - ${item.price.toFixed(2)}&nbsp;
                  <Button id="add" size="sm" onClick={() => handleAddItem(item.itemId)}>Add</Button>
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

export default UpdateOrderForm;
