// pages/orders/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderDetailsCard from '../../components/OrderDetailsCard';
import { getOrderById, deleteOrder, deleteOrderItem } from '../../components/api/orderData';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (router.isReady && id) {
      getOrderById(id)
        .then(setOrder)
        .catch(setError);
    }
  }, [router.isReady, id]);

  const handleDeleteOrder = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this order?');
    if (isConfirmed) {
      deleteOrder(id).then(() => {
        router.push('/orders');
      }).catch((err) => {
        console.error('Failed to delete order:', error);
        setError(err);
      });
    }
  };

  const handleDeleteItem = (orderId, orderItemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteOrderItem(orderId, orderItemId).then(() => {
        getOrderById(orderId).then(setOrder).catch(setError);
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
        />

      </div>
    </div>
  );
}

export default OrderDetails;
