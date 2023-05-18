import React from "react";
import Header from "../components/Header";

import newsImg1 from "../img/news1.png";
import newsImg2 from "../img/news2.png";
import newsImg3 from "../img/news3.png";
import Vector from "../img/AI_Icon.PNG";

export default function HomeScreen() {
  return (
    <div className="main-header home-main bg-black mb-0 bg-gradient py-3">
      <div style={{ height: "18vh" }}>
        <Header />
      </div>
      <div className="row d-flex flex-row w-100 mb-5 h-100">
        <div className="main-body-text col-md-6 text-white text-center d-flex flex-column justify-content-center align-items-start">
          <div>
            Let's Generate <br />
          </div>
          <div>
            <span className="text-success">Newsletters</span> with AI!
          </div>
        </div>
        <div className="image-stack col-md-6 d-flex justify-content-end align-items-center">
          <img
            src={newsImg2}
            alt=""
            className="image1"
            style={{ transform: "rotate(15deg)", width: "25vh" }}
          />
          <img
            src={newsImg1}
            alt=""
            className="image2"
            style={{ transform: "rotate(-20deg)", width: "25vh", top: "100px" }}
          />

          <img
            src={newsImg3}
            alt=""
            className="image3"
            style={{ transform: "rotate(5deg)", width: "20vh" }}
          />
        </div>
      </div>
      <div
        className="text-content text-white fs-2 d-flex flex-column justify-content-center align-items-center"
        style={{ fontFamily: "Segoe UI", fontWeight: "solid" }}
      >
        <div>Generate your Content</div>
        <div>
          <span>in </span>
          <span className="text-success">3</span>
          <span> simple steps</span>
        </div>
      </div>
      <div
        className="row text-white text-center d-flex flex-row"
        style={{ marginRight: "5%" }}
      >
        <div className="col-md-4 mt-5">
          <div
            className="p-3 d-flex flex-column justify-content-center align-items-center m-3 w-100 h-100"
            style={{
              border: "solid",
              borderColor: "white",
              borderRadius: "70px"
            }}
          >
            <span className="fs-1">1</span>
            <span>Input the links in the following the articles:</span>
          </div>
        </div>
        <div className="col-md-4 mt-5">
          <div
            className="p-3 d-flex flex-column justify-content-center align-items-center m-3 w-100 h-100"
            style={{
              border: "solid",
              borderColor: "white",
              borderRadius: "70px"
            }}
          >
            <span className="fs-1">2</span>
            <span>Choose the tone:</span>
          </div>
        </div>

        <div className="col-md-4 mt-5">
          <div
            className="p-3 d-flex flex-column justify-content-center align-items-center m-3 w-100 h-100"
            style={{
              border: "solid",
              borderColor: "white",
              borderRadius: "70px"
            }}
          >
            <span className="fs-1">3</span>
            <span>Hit "Submit" and let our little robots do their thing</span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="p-0 d-flex justify-content-start align-items-center">
          <div
            className="d-flex justify-content-center"
            style={{ marginRight: "15%" }}
          >
            <img
              className="main-foot-img"
              style={{ width: "45px", height: "45px" }}
              src={Vector}
              alt=""
            ></img>
            <label className="text-white fs-2 mt-0 ms-2">BUGLE AI</label>
          </div>
          <div className="w-50 pe-5 text-white d-flex flex-row justify-content-between align-items-center">
            <div>Watch Demo</div>
            <div>Getstarted</div>
            <div>ContactUs</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <h3 className="text-white fs-6 mt-5 pt-5 pb-5">
          @Bugle AI 2023, all rights reserved
        </h3>
      </div>
    </div>
  );
}
