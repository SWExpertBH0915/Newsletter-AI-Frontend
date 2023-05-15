import React, { useState } from "react";
import { redirect } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div
      className="border border-black shadow p-lg-3"
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <h2 className="mb-4 text-center">Log In</h2>
      <form className="m-lg-5" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <label className="col-lg-4" htmlFor="email">
            Email
          </label>
          <input
            className="col-lg-8"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            id="email"
            name="email"
          />
        </div>
        <div className="row">
          <label className="col-lg-4" htmlFor="password">
            Password
          </label>
          <input
            className="col-lg-8"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="*****"
            id="password"
            name="password"
          />
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-sm btn-success mt-3 mb-3" type="submit">
            Log In
          </button>
        </div>
      </form>
      <button
        className="btn border-0 text-decoration-underline"
        onClick={() => {
          redirect("/register");
        }}
      >
        Don't have an account? Register here
      </button>
    </div>
  );
};
