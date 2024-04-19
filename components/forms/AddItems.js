import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getItems, addItemToOrder } from '../api/orderData';

const ItemAddModal = ({ orderId }) => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getItems().then(setItems).catch(console.error);
  }, []);

  const handleAddItem = (itemId) => {
    addItemToOrder(orderId, itemId)
      .then((response) => {
        console.warn('Item added:', response);
        console.warn('Closing modal now');
        setShow(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    console.warn('Modal show state changed:', show);
  }, [show]);

  return (
    <>
      <Button onClick={() => setShow(true)}>Add Items</Button>
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Items to Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {items.map((item) => (
              <ListGroup.Item key={item.itemId}>
                {item.name} - ${item.price.toFixed(2)}
                <Button id="add" size="sm" onClick={() => handleAddItem(item.itemId)}>Add</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

ItemAddModal.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default ItemAddModal;
