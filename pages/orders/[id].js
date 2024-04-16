// pages/orders/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'react-bootstrap';
import OrderDetailsCard from '../../components/OrderDetailsCard';
import CloseOrderForm from '../../components/forms/CloseOrderForm';
import {
  getOrderById, deleteOrder, deleteOrderItem, closeOrder,
} from '../../components/api/orderData';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [showCloseOrderModal, setShowCloseOrderModal] = useState(false);

  useEffect(() => {
    if (router.isReady && id) {
      getOrderById(id)
        .then(setOrder)
        .catch(setError);
    }
  }, [router.isReady, id]);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError('Failed to fetch order details');
      console.error(err);
    }
  };

  const handleDeleteOrder = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this order?');
    if (isConfirmed) {
      deleteOrder(id).then(() => {
        alert('Order deleted successfully.');
        router.push('/orders');
      }).catch((err) => {
        console.error('Failed to delete order:', error);
        setError(err);
      });
    }
  };

  const handleDeleteItem = (orderItemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteOrderItem(order.orderId, orderItemId).then(() => {
        fetchOrder();
      }).catch((err) => {
        console.error('Failed to delete item:', err);
        setError(err);
      });
    }
  };

  const handleUpdateOrder = () => {
    router.push(`/orders/edit/${id}`);
  };

  const handleAddItem = () => {
    console.warn('handleAddItem called');
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  if (error) {
    return <div>Error fetching order: {error.message}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  console.warn('showModal value:', showModal);

  const onCloseOrder = async (orderId, closureDetails) => {
    try {
      const data = await closeOrder(orderId, closureDetails);
      console.warn('Order closed:', data);
      alert('Order closed successfully.');
      setShowCloseOrderModal(false);
      fetchOrder();
    } catch (err) {
      console.error('Failed to close order:', error);
      setError('Failed to close order');
    }
  };

  return (

    <div id="order-detailspage"><br />
      <h1>{`${order.customerName}'s Order`}</h1><br />
      <div id="order-details">
        <OrderDetailsCard
          order={order}
          onDeleteOrder={handleDeleteOrder}
          onDeleteItem={handleDeleteItem}
          onUpdate={handleUpdateOrder}
          onAddItem={handleAddItem}
          onCloseModal={onCloseModal}
          setShowModal={setShowModal}
          setOrder={setOrder}
          showModal={showModal}
          onCloseOrder={() => setShowCloseOrderModal(true)}
        />
        {/* Modal for closing order */}
        <Modal show={showCloseOrderModal} onHide={() => setShowCloseOrderModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Close Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CloseOrderForm orderId={order.orderId} onCloseOrder={onCloseOrder} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default OrderDetails;
