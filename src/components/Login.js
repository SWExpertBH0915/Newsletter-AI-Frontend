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

  const styles = {
    [`@media (min-width: 300px)`]: {
      width: "100vh"
    }
  };
  return (
    <div
      className="border border-black p-4 shadow position-absolute top-50 start-50 translate-middle"
      style={styles}
    >
      <h2 className="mb-4 text-center">Log In</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="d-flex justify-content-end align-items-center pt-3">
          <Button variant="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Form.Group>
        <Form.Group>
          <Button
            className="btn btn-sm btn-white bg-white text-black border-0 text-decoration-underline mt-4"
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
