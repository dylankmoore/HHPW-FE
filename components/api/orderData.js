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
const deleteOrderItem = (orderId, orderItemId) => {
  console.warn('Deleting item with orderId:', orderId, 'orderItemId:', orderItemId);
  const url = `${endpoint}/orders/${orderId}/items/${orderItemId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete the order item ${orderItemId} from order ${orderId}`);
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

// UPDATE an order
const updateOrder = (orderId, updatedDetails) => {
  const url = `${endpoint}/orders/${orderId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the order');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// ADD items to orders
const addItemToOrder = (orderId, itemId) => {
  const url = `${endpoint}/orders/${orderId}/items/${itemId}`;
  const payload = { itemId };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item to order');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// GET all items
const getItems = () => {
  const url = `${endpoint}/items`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// CLOSE orders
const closeOrder = (orderId, paymentDetails) => {
  const url = `${endpoint}/orders/${orderId}/close`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to close order');
        }
        return response.json();
      })
      .then((data) => {
        console.warn('Order closed:', data);
        resolve(data);
        return data;
      })
      .catch((error) => {
        console.error('Failed to close order:', error);
        reject(error);
      });
  });
};

export {
  getOrders, getOrderById, deleteOrder, deleteOrderItem, createNewOrder, updateOrder, addItemToOrder, getItems, closeOrder,
};
