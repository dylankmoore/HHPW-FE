import React, { useEffect, useState } from 'react';
import { getOrders } from '../components/api/orderData';
import OrderCard from '../components/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <div><br />
      <h1>All Orders</h1><br />
      <div id="orders">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.orderId} orderObj={order} />
          ))
        ) : (
          <p>No orders to currently</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
