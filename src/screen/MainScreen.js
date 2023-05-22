import "./MainScreen.css";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import blankimg from "../img/blank.png";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { useSelector } from "react-redux";

export default function MainScreen() {
  const [newsurl, setNewsurl] = useState("");

  const [styles, setStyles] = useState("bullet point style");
  const [tones, setTones] = useState("authoritative");

  const initailData = [
    {
      url: "",
      headline: "",
      content: "",
      imgurl: blankimg
    }
  ];
  const [data, setData] = useState(initailData);
  const [totalsum, setTotalsum] = useState("");

  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASEURL;

  const isUrl = (str) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(str);
  };

  const checkUrl = (url) => {
    const isValidUrl = isUrl(url);

    if (isValidUrl) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnClick = async () => {
    console.log("Click");
    setData([]);
    var urlCheck = [];

    if (newsurl === "") {
      alert("Please input URL and Prompt");
    } else {
      const lines = newsurl.split("\n");
      const urls = lines.map((line) => line.trim());
      urlCheck = urls.map((url) => {
        return checkUrl(url);
      });

      if (urlCheck.every((value) => value === true)) {
        const body = {
          urls: urls,
          styles: styles,
          tones: tones
        };
        setLoading(true);
        const res = await axios.post(BASE_URL + "/article", body);
        console.log(res.data);
        setData(res.data.result);
        setTotalsum(res.data.totalreulst);
        setLoading(false);
      } else {
        alert("Invalid URL");
      }
    }
  };

  useEffect(() => {}, [data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setNewsurl(e.target.value);
  };

  const handelOnChangeTone = (val) => setTones(val);
  const handelOnChangeStyle = (val) => setStyles(val);

  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.expiredays <= 0) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="home-main bg-black mb-0 bg-gradient py-3">
      <div style={{ height: "18vh" }}>
        <Header />
      </div>
      <div>
        <div className="d-flex flex-column text-white">
          <label style={{ fontSize: "60px" }}>
            Step
            <span style={{ fontWeight: "bolder", color: "#07874d" }}>1</span>
          </label>
          <label style={{ fontSize: "25px" }}>
            Input them{" "}
            <span style={{ fontWeight: "bolder", color: "#07874d" }}>
              URL links{" "}
            </span>
            to your source articles:
          </label>
          <div>
            <label>Input News Article URL's</label>
          </div>
        </div>
        <Form className="mb-4">
          <Form.Group className="pt-4 pb-4 d-flex justify-content-between">
            <Form.Control
              as="textarea"
              rows={10}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Maximum 10 URL's, one on each line"
              style={{
                color: "white",
                backgroundColor: "transparent",
                borderRadius: "4vh",
                paddingLeft: "20px",
                paddingRight: "10px",
                paddingTop: "20px"
              }}
            />
          </Form.Group>
        </Form>
      </div>

      <div>
        <div className="d-flex flex-column text-white">
          <label style={{ fontSize: "60px" }}>
            Step
            <span style={{ fontWeight: "bolder", color: "#07874d" }}>2</span>
          </label>
          <label style={{ fontSize: "25px" }}>
            Choose your summary{" "}
            <span style={{ fontWeight: "bolder", color: "#07874d" }}>
              style{" "}
            </span>
            :
          </label>
          <ToggleButtonGroup
            className="btn d-flex flex-wrap justify-content-between align-items-center"
            type="radio"
            name="style-opetions"
            size="sm"
            value={styles}
            onChange={handelOnChangeStyle}
            style={{ paddingLeft: "0px" }}
          >
            <ToggleButton
              variant="outline-light"
              id="tbg-btn-11"
              value="bullet point style"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Bullet Point Style
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-12"
              value="short paragraph style"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Short Paragraph Style
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-13"
              value="long paragraph style"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Long Paragraph Style
            </ToggleButton>
          </ToggleButtonGroup>
          <label style={{ fontSize: "25px" }}>
            Choose{" "}
            <span style={{ fontWeight: "bolder", color: "#07874d" }}>
              tone{" "}
            </span>
            :
          </label>
          <ToggleButtonGroup
            className="btn d-flex justify-content-center flex-wrap align-items-center"
            type="radio"
            name="tone-options"
            size="sm"
            value={tones}
            onChange={handelOnChangeTone}
            style={{ paddingLeft: "0px" }}
          >
            <ToggleButton
              variant="outline-light"
              id="tbg-btn-1"
              value="authoritative"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Authoritative
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-2"
              value="friendly"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Friendly
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-3"
              value="sarcastic"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Sarcastic
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-4"
              value="calm"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Calm
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-5"
              value="enthusiastic"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Enthusiastic
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-6"
              value="formal"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Formal
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-7"
              value="whimsical"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Whimsical
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-8"
              value="humourous"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Humourous
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-9"
              value="inquisitive"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Inquisitive
            </ToggleButton>

            <ToggleButton
              variant="outline-light"
              id="tbg-btn-10"
              value="whith Emoji's"
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "25vh",
                height: "auto",
                fontSize: "15px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              Whith Emoji's
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className="d-flex flex-column text-white">
        <label style={{ fontSize: "60px" }}>
          Step
          <span style={{ fontWeight: "bolder", color: "#07874d" }}>3</span>
        </label>
        <label style={{ fontSize: "25px" }}>
          Hit{" "}
          <span style={{ fontWeight: "bolder", color: "#07874d" }}>
            submit{" "}
          </span>
          and let our little robots do their thing
        </label>
        {loading ? (
          <div className="d-flex justify-content-end mt-4">
            <Button variant="warning" type="submit" disabled>
              Loading..
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-start mt-4">
            <Button
              variant="success"
              type="submit"
              onClick={handleOnClick}
              style={{ borderRadius: "20px" }}
            >
              Submit
            </Button>
          </div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "transparent",
          paddingBottom: "2rem",
          minHeight: "90vh"
        }}
      >
        <div className="text-white fs-1 text-center">Result</div>
        {loading ? (
          <div className="d-flex justify-content-center align-content-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress size={100} />
            </Box>
          </div>
        ) : (
          <div>
            {data.map((item, index) => (
              <div key={index} exact="true">
                <Form className="bg-transparent pb-3 mb-3">
                  <div className="d-flex flex-row justify-content-between align-content-center">
                    <Form.Group className="pt-1 fs-5 w-50 me-2">
                      <Col>
                        <Form.Label
                          className="align-self-lg-start"
                          column
                          style={{ fontWeight: "bolder", color: "#07874d" }}
                        >
                          URL
                        </Form.Label>
                      </Col>
                      <Col className="align-self-center">
                        <Form.Control
                          className="fs-6 rounded-5"
                          value={item.url}
                          disabled
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            paddingLeft: "20px",
                            paddingRight: "10px"
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="pt-1 fs-5 w-50 ms-2">
                      <Col>
                        <Form.Label
                          className="align-self-lg-start"
                          column
                          style={{ fontWeight: "bolder", color: "#07874d" }}
                        >
                          Headline
                        </Form.Label>
                      </Col>
                      <Col className="align-self-center">
                        <Form.Control
                          className="fs-6 rounded-5"
                          value={item.headline}
                          disabled
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            paddingLeft: "20px",
                            paddingRight: "10px"
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <Form.Group className="pt-3 pb-3 fs-5">
                    <Form.Label
                      className="align-self-lg-start"
                      column
                      style={{ fontWeight: "bolder", color: "#07874d" }}
                    >
                      Contents
                    </Form.Label>

                    <Form.Control
                      className="fs-6 rounded-5"
                      as="textarea"
                      rows={8}
                      value={item.content.trim()}
                      disabled
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        paddingLeft: "20px",
                        paddingRight: "10px"
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="pt-3 fs-5">
                    <Form.Label
                      className="align-self-lg-start"
                      column
                      style={{ fontWeight: "bolder", color: "#07874d" }}
                    >
                      Image
                    </Form.Label>

                    <div
                      style={{
                        borderColor: "white",
                        border: "solid",
                        borderRadius: "5vh",
                        padding: "1vh"
                      }}
                    >
                      <Image
                        className="img-fluid img-thumbnail rounded mx-auto d-block"
                        src={item.imgurl}
                        alt={blankimg}
                      ></Image>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            ))}
            <div className="bg-transparent pt-3 pb-3">
              <Form.Group className="pt-3 pb-3 fs-5">
                <Form.Label
                  className="align-self-lg-start"
                  column
                  style={{ fontWeight: "bolder", color: "#07874d" }}
                >
                  Contents
                </Form.Label>

                <Form.Control
                  className="fs-6 rounded-5"
                  as="textarea"
                  rows={8}
                  value={totalsum.trim()}
                  disabled
                  style={{
                    color: "white",
                    backgroundColor: "transparent",
                    paddingLeft: "20px",
                    paddingRight: "10px"
                  }}
                />
              </Form.Group>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
