import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import { createNewOrder } from '../api/orderData';

const CreateOrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    email: '',
    customerPhone: '',
    isPhone: false,
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  // You may need a function to handle adding items here.
  // For now, let's leave it out until we have the logic for handling items.

  const handleSubmit = async (e) => {
    e.preventDefault();
    createNewOrder(orderDetails)
      .then((newOrder) => {
        setSubmissionStatus({ success: true, message: 'Order created successfully!' });
        router.push(`/orders/${newOrder.orderId}`);
      })
      .catch((error) => {
        setSubmissionStatus({ success: false, message: error.message });
      });
  };

  return (
    <>
      <h1>Create Order</h1><br />
      <div id="createformpage"><br />
        {submissionStatus && (
          <Alert variant={submissionStatus.success ? 'success' : 'danger'}>
            {submissionStatus.message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Name Input */}
          <Form.Group>
            <Form.Label>Name:</Form.Label>
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

          {/* Items will go here */}

          {/* Submit Button */}
          <br />
          <Button type="submit" className="copy-btn raise" id="createsubmit">Submit</Button>
        </Form>
      </div>
    </>
  );
};

export default CreateOrderForm;
