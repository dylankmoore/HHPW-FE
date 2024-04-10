import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderDetailsCard from '../components/OrderDetailsCard';
import { getOrderById } from '../components/api/orderData';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((fetchedOrder) => {
          const isOpen = fetchedOrder.OrderStatus === 'open' || fetchedOrder.isOpen;
          setOrder({ ...fetchedOrder, isOpen });
        })
        .catch((error) => console.error('Error fetching order details:', error));
    }
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Details</h1>
      <h2>{`${order.customerName}'s Order`}</h2>
      <OrderDetailsCard
        order={order}
      />
    </div>
  );
}

export default OrderDetails;
