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

// DELETE an order by ID
const deleteOrder = (orderId) => {
  const url = `${endpoint}/orders/${orderId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the order');
        }
        return response.text();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// DELETE an item from an order
const deleteOrderItem = (orderId, itemId) => {
  const url = `${endpoint}/orders/${orderId}/items/${itemId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete the item ${itemId} from order ${orderId}`);
        }
        return response.text();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// CREATE an order
const createNewOrder = (orderDetails) => {
  const url = `${endpoint}/orders/new`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create new order');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  getOrders, getOrderById, deleteOrder, deleteOrderItem, createNewOrder,
};
