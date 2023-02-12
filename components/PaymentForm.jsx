import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
const PaymentForm = () => {
  return (
    <form className="bg-white shadow-lg max-w-6xl mx-auto px-6 py-4 mt-60 flex flex-col items-center justify-center">
      <CardElement></CardElement>
      <button className="bg-green-500 text-white px-4 py-1">Pay</button>
    </form>
  );
};

export default PaymentForm;
