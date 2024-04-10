/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

function OrderCard({
  orderObj,
}) {
  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div id="ordercard">
      <Card className="mb-3">
        <Card.Header>Order {orderObj.orderId}</Card.Header>
        <Card.Body>
          <Card.Text><strong>Name:</strong> {orderObj.customerName}</Card.Text>
          <Card.Text><strong>Email:</strong> {orderObj.email}</Card.Text>
          <Card.Text><strong>Phone:</strong> {orderObj.customerPhone}</Card.Text>
          <Card.Text><strong>Status:</strong> {orderObj.isOpen ? 'Open' : 'Closed'}</Card.Text>
          <Card.Text><strong>Order Time:</strong> {formatDate(orderObj.orderTime)}</Card.Text><br />
          <Link href={`/orders/${orderObj.orderId}`} passHref>
            <Button type="button" className="copy-btn raise" id="details">View Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    customerName: PropTypes.string,
    email: PropTypes.string,
    customerPhone: PropTypes.string,
    isOpen: PropTypes.bool,
    orderTime: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
