// pages/orders/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderDetailsCard from '../../components/OrderDetailsCard';
import { getOrderById } from '../../components/api/orderData';

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
        <OrderDetailsCard order={order} />
      </div>
    </div>
  );
}

export default OrderDetails;
