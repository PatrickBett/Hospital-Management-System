import React, { useState } from 'react';
import api from './api';
const MpesaPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleMpesaPayment = async () => {
    try {
      const response = await api.fetch('/hms/mpesa-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.data;
      console.log(data)
      console.log("success")
      if (data.error) {
        setPaymentStatus('Payment failed');
      } else {
        setPaymentStatus('Payment initiated, check your phone for the MPesa prompt.');
      }
    } 
    
    catch (error)
     {
      setPaymentStatus('An error occurred.');
    }
  };

  return (
    <div>
      <h2>Pay with M-Pesa</h2>
      <button onClick={handleMpesaPayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default MpesaPayment;
