/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  getItems, addItemToOrder, getOrderById,
} from './api/orderData';

function OrderDetailsCard({
  order, onUpdate, onDeleteOrder, onDeleteItem, setOrder, onCloseOrder,
}) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getItems()
      .then((fetchedItems) => {
        setItems(fetchedItems);
      })
      .catch(console.error);
  }, []);

  const updateOrderDetails = (orderId) => {
    getOrderById(orderId)
      .then((updatedOrder) => {
        setOrder(updatedOrder);
      })
      .catch(console.error);
  };

  const handleAddItem = (itemId) => {
    console.warn('handleAddItem called with itemId:', itemId);

    addItemToOrder(order.orderId, itemId)
      .then((response) => {
        console.warn('Item added:', response);
        setShowModal(false);
        updateOrderDetails(order.orderId);
      })
      .catch(console.error);
  };

  return (
    <Card id="detailcard" className="mb-3">
      <Card.Header
        id="header"
        style={{
          borderRadius: '15px 15px 0 0', display: 'flex', justifyContent: 'space-between', padding: '10px', fontSize: '20px',
        }}
      >
        {`${order.customerName}'s Order`}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {order.isOpen && (
          <Button id="edit1" onClick={() => onUpdate(order.orderId)}>
            <img src="/edit.png" alt="Edit post" style={{ width: '20px', height: '20px' }} />
          </Button>
          )}
          <Button id="delete1" onClick={() => onDeleteOrder(order.orderId)}>
            <img src="/delete.png" alt="Delete post" style={{ width: '20px', height: '20px' }} />
          </Button>
        </div>
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
                <Button id="remove" size="sm" onClick={() => onDeleteItem(item.orderItemId)}>REMOVE</Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="d-flex justify-content-between">
          {order.isOpen && (
            <Button id="additemsbtn" onClick={() => setShowModal(true)}>Add Items</Button>)}
          {order.isOpen && (
            <Button id="closebtn" onClick={onCloseOrder}>Close Order</Button>
          )}
        </ListGroup.Item>
      </ListGroup>
      {/* Modal for adding items */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Items to Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {items.map((item) => (
              <ListGroup.Item key={item.itemId}>
                {item.name} - ${item.price.toFixed(2)}&nbsp;
                <Button
                  id="add"
                  size="sm"
                  onClick={() => handleAddItem(item.itemId)}
                >
                  Add
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
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
  onCloseOrder: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default OrderDetailsCard;
