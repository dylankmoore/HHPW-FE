import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CloseOrderForm({ orderId, onCloseOrder }) {
  const [paymentType, setPaymentType] = useState('');
  const [tipAmount, setTipAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCloseOrder(orderId, { paymentType, tipAmount: parseFloat(tipAmount) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Payment Type:
        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
          <option value="">Select a type</option>
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
          <option value="mobile-payment">Mobile Payment</option>
        </select>
      </label>
      <label>
        Tip Amount:
        <input
          type="number"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          required
        />
      </label>
      <button type="submit">Close Order</button>
    </form>
  );
}

CloseOrderForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  onCloseOrder: PropTypes.func.isRequired,
};

export default CloseOrderForm;
