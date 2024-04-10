import { clientCredentials } from '../../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET all orders
const getOrders = () => {
  const url = `${endpoint}/orders`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// GET orders by ID
const getOrderById = (orderId) => {
  const url = `${endpoint}/orders/${orderId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export { getOrders, getOrderById };
