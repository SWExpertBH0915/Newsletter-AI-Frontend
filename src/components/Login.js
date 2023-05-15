import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="bg-black text-white p-1 d-flex text-center min-vh-100 align-items-center justify-content-center">
      {/* <h2 className="mb-4 text-center">Log In</h2> */}
      <Form
        className="login-formMedia"
        style={{
          // backgroundColor: "#0e0f0f",
          padding: "2rem",
          border: "1px solid #ffffff",
          borderRadius: "20px"
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="float-start">Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="float-start">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="d-flex justify-content-end align-items-center pt-3">
          <Button variant="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Form.Group>
        <Form.Group>
          <Button
            className="btn btn-sm btn-white bg-black text-white border-0 text-decoration-underline mt-4"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't Have an account? Register here
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
