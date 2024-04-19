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
      <h1>All Orders</h1><hr /><br />
      <div id="orders">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.orderId} orderObj={order} />
          ))
        ) : (
          <p>No orders to show currently.</p>
        )}
        <footer style={{
          padding: '20px 10px',
          textAlign: 'center',
          borderTop: '1px solid black',
          width: '100%',
          fontFamily: 'monospace',
          fontSize: '14px',
        }}
        >
          HIP HOP, PIZZA, & WANGS, 237 MUSIC ROW, NASHVILLE, TN, 37203 - HHPWFOREVER@GMAIL.COM
        </footer>
      </div>
    </div>
  );
}

export default Orders;
