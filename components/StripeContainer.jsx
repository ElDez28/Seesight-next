import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY =
  "pk_test_51MZUUkFF8DaRowuYURnQMgEo4mHEgEDRNLDuNnRgQj3Kbq4en08OX29Iw1XzVmFAhC5rw2eXhixDaTuFkpLH0jXI00NCWYmo4d";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const options = {
  clientSecret: "{{}}",
};
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default StripeContainer;
