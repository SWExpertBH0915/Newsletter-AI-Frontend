import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Payment from "./Payment";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function Warapper() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}
