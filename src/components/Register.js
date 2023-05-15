import React, { useState } from "react";
import { redirect } from "react-router-dom";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div
      className="border border-black shadow p-5"
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <h2 className="mb-4 text-center">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <label className="col-3" htmlFor="email">
            Email
          </label>
          <input
            className="col-9"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            id="email"
            name="email"
          />
        </div>
        <div className="row">
          <label className="col-3" htmlFor="password">
            Password
          </label>
          <input
            className="col-9"
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
    // <div className="auth-form-container">
    //   <h2>Register</h2>
    //   <form className="register-form" onSubmit={handleSubmit}>
    //     <label htmlFor="name">Full name</label>
    //     <input
    //       type="name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Enter your name"
    //       id="name"
    //       name="name"
    //     />
    //     <label htmlFor="email">email</label>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Enter your Email"
    //       id="email"
    //       name="email"
    //     />

    //     <label htmlFor="password">password</label>
    //     <input
    //       type="password"
    //       value={pass}
    //       onChange={(e) => setPass(e.target.value)}
    //       placeholder="*****"
    //       id="password"
    //       name="password"
    //     />
    //     <button type="submit">Register</button>
    //   </form>
    //   <button
    //     className="link-btn"
    //     onClick={() => {
    //       redirect("/login");
    //     }}
    //   >
    //     Already have an account? Log In here
    //   </button>
    // </div>
  );
};
