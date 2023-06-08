import "./Payment.css";
import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

// const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function Payment() {
  let navigate = useNavigate();
  return (
    <div className="card card-container">
      <form className="form-group d-flex flex-column">
        <label className="mb-4 fs-2 fw-bold text-center text-white">
          Payment confirmed!
        </label>
        <button
          className="btn btn-success"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register Now
        </button>
      </form>
    </div>
  );
}
