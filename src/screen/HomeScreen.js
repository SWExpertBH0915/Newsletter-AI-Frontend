import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <>
      <header className="row pt-4 mx-0" style={{ backgroundColor: "#0e0e0e" }}>
        <div className="col-md-2 d-flex justify-content-between align-self-lg-end px-4 fs-6">
          <Link className="text-decoration-none text-white fs-5" to="/">
            Demo
          </Link>
          <Link className="text-decoration-none text-white fs-5" to="/">
            Contact
          </Link>
        </div>
        <div className="col-md-8 text-white fs-1 d-flex justify-content-center align-items-center mt-3">
          Newsletter AI
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-lg btn-success rounded-5"
            style={{}}
            onClick={() => {
              navigate("/newlettergenerate");
            }}
          >
            GET START
          </button>
        </div>
      </header>
      <body className="bg-black">
        <div
          className="text-bg-light bg-black text-white text-center mb-4 pt-5"
          style={{
            fontSize: "96px",
            fontFamily: "Proxima Nova",
            fontWeight: "bold"
          }}
        >
          Let's Generate <br />
          Newsletter
          <br /> with AI!
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-lg btn-success rounded-5"
            onClick={() => {
              navigate("/newlettergenerate");
            }}
          >
            WATCH DEMO
          </button>
        </div>
        <div>
          <h1 className="text-center mt-5 text-white-50 pb-5">HOW IT WORKS</h1>
          <div className="row text-center pb-5">
            <div className="col-4 px-5 text-white-50">
              <h2>1. EMAIL LINKS</h2>
              <p>
                Just send links to the articles you want to include to
                <br />
                receiving@parse.redense.com
              </p>
            </div>
            <div className="col-4 px-5 text-white-50">
              <h2>2. LET OUR AI DO ITS MAGIC</h2>
              <p>
                Our service leverages GPT3.5 and GPT4 to parse your links to
                create an AI generated headline and description.
              </p>
            </div>
            <div className="col-4 px-5 text-white-50">
              <h2>3. BUILD YOUR NEWSLETTER</h2>
              <p>
                Build your newsletter at the end of the day. Our AI will write a
                newsletter that lets you get started.
              </p>
            </div>
          </div>
        </div>
      </body>
      <footer className="footer">
        <h3 className="pt-3">@Newsletter AI 2023</h3>
      </footer>
    </>
  );
}
