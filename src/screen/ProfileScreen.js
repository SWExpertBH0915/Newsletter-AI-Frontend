import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import {
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASEURL;
export default function ProfileScreen() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [price, setPrice] = useState(30);

  const handelOnChangeMonth = (val) => setPrice(val);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleOnClick = async () => {
    const res = await axios
      .post(`${BASE_URL}/payment/cancel`, {
        currentUser: currentUser
      })
      .catch((error) => {
        alert(error.message);
      });
    if (res.status === 201) {
      const cancelstatus = res.data.result;
      alert(cancelstatus);
      // await axios.put(`${BASE_URL}/api/update/${currentUser.id}`, {
      //   subscriptionId: "",
      //   subscriptionStatus: ""
      // });
    } else {
      alert("Try again");
    }
    const newUser = await axios
      .get(`${BASE_URL}/test/user/${currentUser.id}`, {
        headers: {
          "x-access-token": currentUser.accessToken
        }
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    console.log(newUser);
    window.location.reload();
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ height: "18vh" }}>
      <div className="home-main bg-black mb-0 bg-gradient py-3">
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
              Free Trial Remaining{" "}
              <span
                style={{
                  fontWeight: "bolder",
                  color: "#07874d"
                }}
              >
                {Math.ceil(currentUser.expiredays)}
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
              $19.95 per a month
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <div className="mb-5">
            <label className="text-white">
              Payment process:{" "}
              {currentUser.subscriptionStatus === "active" ||
              currentUser.subscriptionStatus === "trialing" ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <span className="mb-3 mt-1">Active</span>
                  <botton
                    className="btn btn-sm btn-outline-light"
                    onClick={handleOnClick}
                  >
                    Cancel
                  </botton>
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <span className="mb-3">Deactive</span>
                  <Button
                    href={process.env.REACT_APP_PAYMENT_URL}
                    target="_blank"
                    variant="secondary"
                    size="md"
                    style={{ background: "bottom" }}
                  >
                    Pay Now
                  </Button>
                </div>
              )}
            </label>
          </div>

          <Modal show={show} onHide={handleClose}>
            {/* <Modal.Body>
            </Modal.Body> */}
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
