import "./PaymentInfo.css";
import { PAYMENT_VERIFIED } from "../actions/types";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function PaymentInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardemail, setCardemail] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const handleOnChangeCEamil = (e) => {
    e.preventDefault();
    setCardemail(e.target.value);
  };

  const handleOnChangeCNumber = (e) => {
    e.preventDefault();
    setCardnumber(e.target.value);
    console.log(cardnumber);
  };
  const handleOnChangeExp = (e) => {
    e.preventDefault();
    setExp(e.target.value);
  };
  const handleOnChangeCvc = (e) => {
    e.preventDefault();
    setCvc(e.target.value);
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASEURL;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const body = {
      isPayment: true,
      cardemail: cardemail,
      cardnumber: cardnumber,
      exp: exp,
      cvc: cvc
    };
    await axios.put(`${BASE_URL}/update/${currentUser.id}`, body);
    const res = await axios.get(`${BASE_URL}/test/user/${currentUser.id}`, {
      headers: {
        "x-access-token": currentUser.accessToken
      }
    });
    console.log(res);
    dispatch({
      type: PAYMENT_VERIFIED,
      payload: { user: res.data }
    });
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/");
    window.location.reload();
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="h-100">
      <Form className="paycard-container">
        <div>
          <label className="text-center fs-5">
            Upgrade to Bugleai.com Trial
          </label>
          <label className="mt-3">
            Start your 7-day free trial. You can cancel anytime during your
            trial and you won't be charged anything.
          </label>
        </div>
        <div>
          <label></label>
        </div>
        <div>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => {
              handleOnChangeCEamil(e);
            }}
          ></Form.Control>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => {
              handleOnChangeCNumber(e);
            }}
          ></Form.Control>
          <Form.Label>Exp</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => {
              handleOnChangeExp(e);
            }}
          ></Form.Control>
          <Form.Label>CVC</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => {
              handleOnChangeCvc(e);
            }}
          ></Form.Control>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-success text-center mt-3 w-25 border-2"
            onClick={handleOnSubmit}
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
