import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="row pt-4 mx-0"
        style={{ backgroundColor: "#0e0e0e", height: "15vh" }}
      >
        <div className="col-md-2 d-flex align-self-lg-start px-4 fs-6">
          <Link className="text-decoration-none text-white fs-6" to="/">
            Contact Us
          </Link>
        </div>
        <div className="col-md-8 text-white fs-1 d-flex justify-content-center align-items-center mt-3">
          BUGLE AI
        </div>
        <div className="col-md-2 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-sm btn-success rounded-5"
            onClick={() => {
              navigate("/newlettergenerate");
            }}
          >
            WATCH DEMO
          </button>
          <button
            className="btn btn-sm btn-success rounded-5"
            style={{}}
            onClick={() => {
              navigate("/login");
            }}
          >
            GET START
          </button>
        </div>
      </div>
      <div
        className="text-bg-light bg-black text-white text-center pt-5 d-flex justify-content-center align-items-center"
        style={{
          fontSize: "3rem",
          fontFamily: "Proxima Nova",
          fontWeight: "bold",
          height: "80vh"
        }}
      >
        Let's Generate <br />
        Newsletters with AI!
      </div>
      <div className="footer">
        <h3 className="pt-3">@Bugle AI 2023</h3>
      </div>
    </>
  );
}
