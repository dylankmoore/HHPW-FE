import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { getTotalRevenueDetails } from '../components/api/revenueData';

const RevenuePage = () => {
  const [revenueDetails, setRevenueDetails] = useState({
    totalSales: 0,
    totalTips: 0,
    phoneOrders: 0,
    inPersonOrders: 0,
    cashPayments: 0,
    mobilePayments: 0,
    debitPayments: 0,
    creditPayments: 0,
  });

  const fetchRevenueDetails = () => {
    getTotalRevenueDetails()
      .then((data) => {
        setRevenueDetails({
          totalSales: data.totalSales,
          totalTips: data.totalTips,
          phoneOrders: data.phoneOrdersCount,
          inPersonOrders: data.inPersonOrdersCount,
          cashPayments: data.cashPaymentsCount,
          mobilePayments: data.mobilePaymentsCount,
          debitPayments: data.debitPaymentsCount,
          creditPayments: data.creditPaymentsCount,
        });
      })
      .catch((error) => {
        console.error('There was an error fetching the revenue details:', error);
      });
  };

  useEffect(() => {
    fetchRevenueDetails();
  }, []);

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  return (
    <div><br />
      <h1>Revenue Totals</h1><hr /><br />
      <div id="revenuecard">
        <Card className="mb-3" style={{ width: '30%' }}>
          <Card.Header>Revenue Summary</Card.Header>
          <Card.Body>
            <Card.Text><strong>Total Sales:</strong> {formatCurrency(revenueDetails.totalSales)}</Card.Text>
            <Card.Text><strong>Total Tips:</strong> {formatCurrency(revenueDetails.totalTips)}</Card.Text>
            <Card.Text><strong>Total Phone Orders:</strong> {revenueDetails.phoneOrders}</Card.Text>
            <Card.Text><strong>Total In Person Orders:</strong> {revenueDetails.inPersonOrders}</Card.Text>
            <Card.Text><strong>Payments made with cash:</strong> {revenueDetails.cashPayments}</Card.Text>
            <Card.Text><strong>Payments made with mobile:</strong> {revenueDetails.mobilePayments}</Card.Text>
            <Card.Text><strong>Payments made with debit:</strong> {revenueDetails.debitPayments}</Card.Text>
            <Card.Text><strong>Payments made with credit:</strong> {revenueDetails.creditPayments}</Card.Text>
          </Card.Body>
        </Card>
      </div><br /><br />
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
  );
};

export default RevenuePage;
