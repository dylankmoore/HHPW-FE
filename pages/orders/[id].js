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
        alert('Order deleted successfully.');
        router.push('/orders'); // Adjust the path as necessary
      }).catch((err) => {
        console.error('Failed to delete order:', error);
        setError(err);
      });
    }
  };

  const handleDeleteItem = (itemId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      deleteOrderItem(itemId).then(() => {
        alert('Item deleted successfully.');
        getOrderById(id).then(setOrder).catch(setError);
      }).catch((err) => {
        console.error('Failed to delete item:', error);
        setError(err);
      });
    }
  };

  if (error) {
    return <div>Error fetching order: {error.message}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div id="order-detailspage"><br />
      <h1>{`${order.customerName}'s Order`}</h1><br />
      <div id="order-details">
        {/* render over order.items and render an OrderDetailsCard for each */}
        <OrderDetailsCard
          order={order}
          onDeleteOrder={handleDeleteOrder}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
}

export default OrderDetails;
