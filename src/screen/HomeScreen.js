import "./HomeScreen.css";
import React from "react";
import Header from "../components/Header";

import newsImg1 from "../img/news1.png";
import newsImg2 from "../img/news2.png";
import newsImg3 from "../img/news3.png";
import { ReactComponent as LogoIcon } from "../img/icon.svg";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div className="home-main bg-black mb-0 bg-gradient py-3">
      <div style={{ height: "18vh" }}>
        <Header />
      </div>
      <div className="main-body text-white">
        <div className="main-body-text">
          <div>
            Let's Generate <br />
          </div>
          <div>
            <span className="text-success">Newsletters</span> with AI!
          </div>
        </div>

        <div className="image-stack d-flex justify-content-end align-items-center">
          <img
            src={newsImg2}
            alt=""
            className="image2"
            style={{ transform: "rotate(-14deg)", width: "19vh" }}
          />
          <img
            src={newsImg3}
            alt=""
            className="image3"
            style={{ transform: "rotate(13deg)", width: "24vh" }}
          />
          <img
            src={newsImg1}
            alt=""
            className="image1"
            style={{ transform: "rotate(-6deg)", width: "26vh" }}
          />
        </div>
      </div>
      <div className="main-text-content">
        <div>Generate your Content</div>
        <div>
          <span>in </span>
          <span className="text-success">3</span>
          <span> simple steps</span>
        </div>
      </div>
      <div className="main-step">
        <div>
          <span id="main-step-number">1</span>
          <span id="main-step-content">
            Input the URL <span className="fw-bold">Links </span>to your source
            articles
          </span>
        </div>
        <div>
          <span id="main-step-number">2</span>
          <span id="main-step-content">
            Choose the type of <span className="fw-bold">Summary </span>and your{" "}
            <span className="fw-bold">Tone </span>
            of voice
          </span>
        </div>
        <div>
          <span id="main-step-number">3</span>
          <span id="main-step-content">
            Hit <span className="fw-bold">"Submit"</span> and let our little
            robots do their thing
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="header-btn btn btn-md btn-success rounded-5"
          style={{ width: "20vh" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          GET STARTED
        </button>
      </div>

      <div className="main-foot">
        <div className="home-bugleai-div" style={{ marginRight: "15%" }}>
          <div id="main-vector-img">
            <LogoIcon />
          </div>
          <label className="home-bugleai-text">BUGLE AI</label>
        </div>
        <div className="main-foot-items">
          <a className="text-white text-decoration-none" href="/demo">
            Watch Demo
          </a>
          <a className="text-white text-decoration-none" href="/mainscreen">
            Getstarted
          </a>
          <a className="text-white text-decoration-none" href="/contactus">
            ContactUs
          </a>
        </div>
      </div>
      <div className="footer">
        <h3 className="home-footer-reserve text-white fs-6 pt-1 pb-5">
          @Bugle AI 2023, all rights reserved
        </h3>
      </div>
    </div>
  );
}
