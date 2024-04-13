import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import { getOrderById, updateOrder } from '../api/orderData';

const UpdateOrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerPhone: '',
    email: '',
    isPhone: false,
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then((data) => {
          setOrderDetails({
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            email: data.email,
            isPhone: data.isPhone,
          });
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
      <h1>Update Order</h1><br />
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
          </Form.Group><br /><br />

          <Button type="submit" className="copy-btn raise" id="update-btn">Update Order</Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateOrderForm;
