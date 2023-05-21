import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// import "./Stripe.css";

// console.log(process.env.REACT_APP_PUBLISHABLE_KEY);

const stripePromise = loadStripe(
  "pk_live_51MyImMIrQBekSI5uvNWIqfPdM8P5J0lN3FMiZhN6hYjOkts4oAvjBfYOreoRLitPENebG2phuSjGFZPUPdMRMiyn00CuLJZwup"
);

const BASE_URL = process.env.REACT_APP_BASEURL;
export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(BASE_URL + "/payment1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe"
  };
  const options = {
    clientSecret,
    appearance
  };
  return (
    <div className="paymentApp">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
