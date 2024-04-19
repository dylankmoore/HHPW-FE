import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CloseOrderForm({ orderId, onCloseOrder }) {
  const [paymentType, setPaymentType] = useState('');
  const [tipAmount, setTipAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      paymentType,
      tipAmount: parseFloat(tipAmount),
    };

    // Log specific fields instead of the whole payload
    console.warn('Submitting close order with payment type:', paymentType);
    console.warn('Submitting close order with tip amount:', parseFloat(tipAmount));

    onCloseOrder(orderId, payload)
      .then((response) => {
        console.warn('Order closed successfully, response:', response); // Log success response
      })
      .catch((error) => {
        console.error('Error closing order:', error); // Log any errors
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Payment Type:
        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
          <option value="">Select a type</option>
          <option value="cash">Cash</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
          <option value="mobile-payment">Mobile</option>
        </select>
      </label>
      <label><br />
        Tip Amount:
        <input
          type="number"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          required
        />
      </label><br /><br />
      <button type="submit">Close Order</button>
    </form>
  );
}

CloseOrderForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  onCloseOrder: PropTypes.func.isRequired,
};

export default CloseOrderForm;
