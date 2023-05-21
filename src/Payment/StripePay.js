import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function StripePay(price1) {
  const BASE_URL = process.env.REACT_APP_BASEURL;
  const handleOnPay = async () => {
    await axios.post(BASE_URL + "/payment", {
      price: price1.price
    });
  };

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <div>
      <section>
        <div className="product">
          <div className="description">
            <h3>Payment</h3>
            <span>Total amount: $</span>
            <label>{price1.price}</label>
          </div>
        </div>
        <button onClick={handleOnPay}>Pay now</button>
      </section>
    </div>
  );
}
