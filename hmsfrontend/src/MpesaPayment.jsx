import React, { useState } from 'react';

const MpesaPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleMpesaPayment = async () => {
    try {
      const response = await fetch('/hms/mpesa-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) {
        setPaymentStatus('Payment failed');
      } else {
        setPaymentStatus('Payment initiated, check your phone for the MPesa prompt.');
      }
    } catch (error) {
      setPaymentStatus('An error occurred.');
    }
  };

  return (
    <div>
      <h2>Pay with MPesa</h2>
      <button onClick={handleMpesaPayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default MpesaPayment;