/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function OrderDetailsCard({
  order, onUpdate, onDeleteOrder, onDeleteItem, onAddItem, onCloseOrder,
}) {
  console.warn({ onDeleteOrder, onDeleteItem });
  return (
    <Card id="detailcard" className="mb-3">
      <Card.Header style={{
        borderRadius: '15px 15px 0 0', display: 'flex', justifyContent: 'space-between', padding: '10px',
      }}
      >
        {`${order.customerName}'s Order`}
        {order.isOpen && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button id="edit1" onClick={() => onUpdate(order.orderId)}>
              <img src="/edit.png" alt="Edit post" style={{ width: '20px', height: '20px' }} />
            </Button>
            <Button id="delete1" onClick={() => onDeleteOrder(order.orderId)}>
              <img src="/delete.png" alt="Delete post" style={{ width: '20px', height: '20px' }} />
            </Button>
          </div>
        )}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>Email:</strong> {order.email}</ListGroup.Item>
        <ListGroup.Item><strong>Phone:</strong> {order.customerPhone}</ListGroup.Item>
        <ListGroup.Item><strong>Order Type:</strong> {order.isPhone ? 'Phone' : 'In-person'}</ListGroup.Item>
        <ListGroup.Item><strong>Status:</strong> {order.isOpen ? 'Open' : 'Closed'}</ListGroup.Item>
        <ListGroup.Item><strong>Revenue Total:</strong> ${order.revTotal.toFixed(2)}</ListGroup.Item>
        {order.isOpen || <ListGroup.Item><strong>Tip:</strong> ${order.tip.toFixed(2)}</ListGroup.Item>}
        {order.isOpen || <ListGroup.Item><strong>Closed Time:</strong> {new Date(order.closeTime).toLocaleString()}</ListGroup.Item>}
        <ListGroup.Item><strong>Open Time:</strong> {new Date(order.orderTime).toLocaleString()}</ListGroup.Item>
        {order.items.map((item) => (
          <ListGroup.Item key={item.orderItemId}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Items:</h6>
                {item.itemName} - ${item.price.toFixed(2)}
              </div>

              {order.isOpen && (
                <Button variant="outline-dark" size="sm" onClick={() => onDeleteItem(item.orderItemId)}>Delete</Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="d-flex justify-content-between">
          {order.isOpen && (
          <Button id="additemsbtn" onClick={onAddItem}>Add Items</Button>)}
          {order.isOpen && (
            <Button id="delitemsbtn" onClick={() => onCloseOrder(order.orderId)}>Close Order</Button>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

OrderDetailsCard.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    customerPhone: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isPhone: PropTypes.bool.isRequired,
    orderTime: PropTypes.string.isRequired,
    closeTime: PropTypes.string,
    revTotal: PropTypes.number.isRequired,
    tip: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
      orderItemId: PropTypes.number.isRequired,
      itemName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDeleteOrder: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onCloseOrder: PropTypes.func.isRequired,
};

export default OrderDetailsCard;
