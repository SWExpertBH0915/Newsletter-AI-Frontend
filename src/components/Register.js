// import React, { useState } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASEURL;

// export default function Register() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const defaultRole = ["user"];
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const body = {
//       username: username,
//       email: email,
//       password: password,
//       roles: defaultRole
//     };
//     try {
//       // const res = await axios.post(BASE_URL + "/auth/signup", body);
//       // alert(res.data.message);
//       // navigate("/login");
//     } catch (err) {
//       console.log(err.response.data.message);
//     }
//   };
//   return (
//     <div className="bg-black text-white p-3 d-flex text-center min-vh-100 align-items-center justify-content-center">
//       <Form
//         className="login-formMedia"
//         style={{
//           padding: "2rem",
//           border: "1px solid #ffffff",
//           borderRadius: "20px"
//         }}
//       >
//         <h2 className="text-center">Register</h2>
//         <Form.Group className="mb-3" controlId="formBasicName">
//           <Form.Label className="float-start">Username</Form.Label>
//           <Form.Control
//             type="text"
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username..."
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label className="float-start">Email</Form.Label>
//           <Form.Control
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email..."
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label className="float-start">Password</Form.Label>
//           <Form.Control
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </Form.Group>
//         <Form.Group className="d-flex justify-content-end align-items-center pt-3">
//           <Button variant="primary" onClick={handleRegister}>
//             Register
//           </Button>
//         </Form.Group>
//         <Form.Group>
//           <Button
//             className="btn btn-sm btn-white bg-black text-white border-0 text-decoration-underline mt-4"
//             onClick={() => {
//               navigate("/login");
//             }}
//           >
//             Aleardy have an account? Login here
//           </Button>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// }

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group mt-3">
                <button className="btn btn-primary btn-block float-end">
                  Sign Up
                </button>
                <button
                  className="btn btn-sm btn-white border-0 text-decoration-underline mt-4"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Aleardy have an account? Login here
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
              <button
                className="btn btn-sm btn-white bg-black text-white border-0 text-decoration-underline mt-4"
                onClick={navigate("/login")}
              >
                Signin now
              </button>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
