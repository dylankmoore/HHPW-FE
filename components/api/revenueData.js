import { clientCredentials } from '../../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET total revenue
const getTotalRevenue = () => {
  const url = `${endpoint}/revenue/total`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch total revenue');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// GET total revenue details
const getTotalRevenueDetails = () => {
  const url = `${endpoint}/revenue`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch revenue details');
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export { getTotalRevenue, getTotalRevenueDetails };
