import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import {
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { useState } from "react";
import StripePay from "../Payment/StripePay";

export default function ProfileScreen() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [price, setPrice] = useState(30);

  const handelOnChangeMonth = (val) => setPrice(val);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div style={{ height: "18vh" }}>
      <div className="main-header home-main bg-black mb-0 bg-gradient py-3">
        <Header />
      </div>
      <div className="bg-black" style={{ height: "110vh" }}>
        <div className="text-white text-center d-flex flex-column justify-content-center align-content-center w-100 pt-5">
          <div className="pb-5">
            <h1>{currentUser.username}</h1>
          </div>
          <div>
            <h4>Email: {currentUser.email}</h4>
          </div>
          <div>
            <label className="fs-4">
              Premium remains{" "}
              <span
                style={{
                  fontWeight: "bolder",
                  color: "#07874d"
                }}
              >
                {currentUser.expiredays}
              </span>{" "}
              days
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <ToggleButtonGroup
            className="btn d-flex flex-column flex-wrap justify-content-between align-items-center"
            type="radio"
            name="style-options"
            size="sm"
            value={price}
            onChange={handelOnChangeMonth}
            style={{ paddingLeft: "0px" }}
          >
            <ToggleButton
              variant="outline-light"
              id="tbg-btn-11"
              value={30}
              style={{
                borderRadius: "21px",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              $19.95 for a month
            </ToggleButton>

            {/* <ToggleButton
              variant="outline-light"
              id="tbg-btn-12"
              value={80}
              style={{
                borderRadius: "21px",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              $80 for 3 months
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-13"
              value={150}
              style={{
                borderRadius: "21px",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              %150 for 6 months
            </ToggleButton> */}
          </ToggleButtonGroup>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">
          {/* <Button onClick={handleShow} variant="secondary" size="md">
            Pay Now
          </Button> */}
          {/* <Button
            href="https://buy.stripe.com/4gw9CQ2Wj5ZCh209AA"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            size="md"
          >
            Pay Now
          </Button> */}
          <Button href="/payment" target="_blank" variant="secondary" size="md">
            Pay Now
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <StripePay price={price} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
