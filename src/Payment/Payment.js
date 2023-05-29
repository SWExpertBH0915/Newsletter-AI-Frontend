import "./Payment.css";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_VERIFIED } from "../actions/types";
// import { LoadingButton } from "../screen/LoadingButton";
import { Button, Modal } from "react-bootstrap";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const initialsubscription = {
  id: "sub_1NComCG5kLiwxuBiRCyh2FlW",
  object: "subscription",
  application: null,
  application_fee_percent: null,
  automatic_tax: {
    enabled: false,
  },
  billing_cycle_anchor: 1685300232,
  billing_thresholds: null,
  cancel_at: null,
  cancel_at_period_end: false,
  canceled_at: null,
  cancellation_details: {
    comment: null,
    feedback: null,
    reason: null,
  },
  collection_method: "charge_automatically",
  created: 1685300232,
  currency: "usd",
  current_period_end: 1687978632,
  current_period_start: 1685300232,
  customer: "cus_NymKISkqUv91PV",
  days_until_due: null,
  default_payment_method: null,
  default_source: null,
  default_tax_rates: [],
  description: null,
  discount: null,
  ended_at: null,
  items: {
    object: "list",
    data: [
      {
        id: "si_NymKOaNMygJKku",
        object: "subscription_item",
        billing_thresholds: null,
        created: 1685300233,
        metadata: {},
        price: {
          id: "price_1NBeNdG5kLiwxuBiOuTtVwLN",
          object: "price",
          active: true,
          billing_scheme: "per_unit",
          created: 1685021941,
          currency: "usd",
          custom_unit_amount: null,
          livemode: false,
          lookup_key: null,
          metadata: {},
          nickname: null,
          product: "prod_NxZWUCtt46Y6b9",
          recurring: {
            aggregate_usage: null,
            interval: "month",
            interval_count: 1,
            usage_type: "licensed",
          },
          tax_behavior: "unspecified",
          tiers_mode: null,
          transform_quantity: null,
          type: "recurring",
          unit_amount: 1950,
          unit_amount_decimal: "1950",
        },
        quantity: 1,
        subscription: "sub_1NComCG5kLiwxuBiRCyh2FlW",
        tax_rates: [],
      },
    ],
    has_more: false,
    url: "/v1/subscription_items?subscription=sub_1NComCG5kLiwxuBiRCyh2FlW",
  },
  latest_invoice: "in_1NComCG5kLiwxuBiJIZqFI9B",
  livemode: false,
  metadata: {},
  next_pending_invoice_item_invoice: null,
  on_behalf_of: null,
  pause_collection: null,
  payment_settings: {
    payment_method_options: null,
    payment_method_types: null,
    save_default_payment_method: "off",
  },
  pending_invoice_item_interval: null,
  pending_setup_intent: null,
  pending_update: null,
  schedule: null,
  start_date: 1685300232,
  status: "active",
  test_clock: null,
  transfer_data: null,
  trial_end: null,
  trial_settings: {
    end_behavior: {
      missing_payment_method: "create_invoice",
    },
  },
  trial_start: null,
};

export default function Payment() {
  const [error, setError] = useState("");
  // const [stripe, setStripe] = useState(null);
  // const [card, setCard] = useState(null);
  const [cardemail, setCardemail] = useState("");

  const [isloading, setIsloading] = useState(false);

  const [subscription, setSubscription] = useState(initialsubscription);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   const initializeStripe = async () => {
  //     // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  //     // const stripeInstance = await stripePromise;
  //     // const cardElement = stripeInstance.elements().create("card");
  //     // setStripe(stripeInstance);
  //     // setCard(cardElement);
  //     // cardElement.mount("#card-element");

  //     // cardElement.addEventListener("change", (event) => {
  //     //   setError(event.error ? event.error.message : "");
  //     // });
  //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  //     const stripe = await stripePromise;
  //     const card = stripe.elements().create("card");
  //     setStripe(stripe);
  //     setCard(card);
  //     card.mount("#card-element");

  //     card.addEventListener("change", (event) => {
  //       setError(event.error ? event.error.message : "");
  //     });
  //   };

  //   initializeStripe();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    setIsloading(true);

    if (stripe && cardElement) {
      const { error, token } = await stripe.createToken(cardElement);

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
        email: cardemail,
      }
    );
    if (res.status === 201) {
      localStorage.setItem("subscription", JSON.stringify(res.data.result));
      alert("success");
      setSubscription(res.data.result);
      setShow(true);
      dispatch({
        type: PAYMENT_VERIFIED,
      });
      // alert(res.data.result.)
      if (currentUser) {
        navigate("/profile");
      }
      // else {
      //   navigate("/register");
      // }
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
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{subscription.status}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>{subscription.items.data[0].price.unit_amount}</label>
            <label>{subscription.current_period_start}</label>
            <label>{subscription.current_period_end}</label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={navigate("/register")}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
