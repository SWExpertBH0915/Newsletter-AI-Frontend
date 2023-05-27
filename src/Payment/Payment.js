import "./Payment.css";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_VERIFIED } from "../actions/types";
import { LoadingButton } from "../screen/LoadingButton";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function Payment() {
  const [error, setError] = useState("");
  const [stripe, setStripe] = useState(null);
  const [card, setCard] = useState(null);
  const [cardemail, setCardemail] = useState("");

  const [isloading, setIsloading] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      const cardElement = stripeInstance.elements().create("card");
      setStripe(stripeInstance);
      setCard(cardElement);
      cardElement.mount("#card-element");

      cardElement.addEventListener("change", (event) => {
        setError(event.error ? event.error.message : "");
      });
    };

    initializeStripe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsloading(true);

    if (stripe && card) {
      const { error, token } = await stripe.createToken(card);

      if (error) {
        setError(error.message);
        alert(error.message);
      } else {
        stripeTokenHandler(token);
      }
    }
  };

  const stripeTokenHandler = async (token) => {
    // Send the token to your server
    const res = await axios.post(
      `${process.env.REACT_APP_BASEURL}/payment/subscript`,
      {
        stripeToken: token.id,
        email: cardemail
      }
    );
    if (res.status === 201) {
      localStorage.setItem("subscription", JSON.stringify(res.data.result));
      dispatch({
        type: PAYMENT_VERIFIED
      });
      if (currentUser) {
        navigate("/profile");
      } else {
        navigate("/register");
      }
    } else {
      alert(res.data.result.message);
    }
    setIsloading(false);
  };

  const handleOnEmail = (e) => {
    e.preventDefault();
    setCardemail(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} id="payment-form" className="w-25">
        <div className="form-row">
          <div>
            <label className="fs-4 fw-bold text-center mt-4 mb-4">
              Upgrade to Bugleai.com Trial
            </label>
            <label className="fs-6">
              Start your <span className="fw-bolder">7-day</span> free trial.
              You can cancel anythime during your trail and you won't be charged
              anything.
            </label>
            <label className="fs-6 mt-4 mb-4">
              <span className="fw-bolder">Plan:</span> $19.95/month
            </label>
          </div>
          <div className="payment-email">
            <input type="email" onChange={handleOnEmail} placeholder="Email" />
          </div>
          <label htmlFor="card-element" className="fs-4 mb-3"></label>

          <div id="card-element">
            {/* A Stripe Element will be inserted here. */}
          </div>

          {/* Used to display form errors. */}
          <div id="card-errors" role="alert">
            {error}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {isloading ? (
            <button className="btn btn-warning mt-5" type="submit">
              Loading...
            </button>
          ) : (
            <button className="btn btn-success mt-5" type="submit">
              Submit Payment
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
