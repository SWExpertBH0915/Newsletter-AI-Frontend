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

const tones_temps = [
  "Serious",
  "Humour",
  "Education",
  "Authoritative",
  "Friendly",
  "Sarastic",
  "Calm",
  "Enthusiastic",
  "Formal",
  "Whimsical",
  "Humourous",
  "Inquistive"
];
const tones_contents = {
  Serious: ["Serious", "tones-index-1", "😶"],
  Humour: ["Humour", "tones-index-2", "😄"],
  Education: ["Education", "tones-index-3", "🎓"],
  Authoritative: ["Authoritative", "tones-index-4", "👮‍♂️"],
  Friendly: ["Friendly", "tones-index-5", "🤗"],
  Sarastic: ["Sarastic", "tones-index-6", "😒"],
  Calm: ["Calm", "tones-index-7", "😌"],
  Enthusiastic: ["Enthusiastic", "tones-index-8", "😃"],
  Formal: ["Formal", "tones-index-9", "😐"],
  Whimsical: ["Whimsical", "tones-index-10", "😜"],
  Humourous: ["Humourous", "tones-index-11", "😆"],
  Inquistive: ["Inquistive", "tones-index-12", "🤔"]
};
const styles_temps = [
  ["Bullet Point Style", "styles-index-1", "bullet style with 4 points"],
  ["Short Paragraph Style", "styles-index-2", "2 paragraphs style"],
  ["Long Paragraph Style", "styles-index-3", "4 paragraphs style"]
];

export default function MainScreen() {
  const [newsurl, setNewsurl] = useState("");

  const [styles, setStyles] = useState(styles_temps[0][2]);
  const [tones, setTones] = useState(tones_temps[0]);
  const [withemoji, setWithemoji] = useState(false);
  const [withimg, setWithimg] = useState(true);

  const [resultEmoji, setResultEmoji] = useState("");

  const initailData = [
    {
      url: "",
      headline: "",
      content: "",
      imgurl: blankimg
    }
  ];
  const [data, setData] = useState(initailData);
  // const [totalsum, setTotalsum] = useState("");

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
    setResultEmoji(tones_contents[tones][2]);
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
          tones: tones,
          withimg: withimg,
          withemoji: withemoji
        };
        setLoading(true);
        const res = await axios.post(BASE_URL + "/article", body);
        setData(res.data.result);
        // setTotalsum(res.data.totalreulst);
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

  if (currentUser && currentUser.expiredays <= 0) {
    return <Navigate to="/profile" />;
  }
  // if (currentUser && !currentUser.isPayment) {
  //   alert("Verify your payment");
  //   return <Navigate to="/paymentinfo" />;
  // }

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
            className="btn d-flex flex-wrap justify-content-between align-items-center gap-2"
            type="radio"
            name="style-opetions"
            size="sm"
            value={styles}
            onChange={handelOnChangeStyle}
            style={{ paddingLeft: "0px" }}
          >
            {styles_temps.map((style_temp, index) => (
              <ToggleButton
                variant="outline-light"
                id={style_temp[1]}
                key={index}
                value={style_temp[2]}
                style={{
                  borderRadius: "21px",
                  marginRight: "2vh",
                  marginLeft: "2vh",
                  width: "25vh",
                  height: "auto",
                  fontSize: "15px",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}
              >
                {style_temp[0]}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
            <label style={{ fontSize: "25px" }}>
              Choose{" "}
              <span style={{ fontWeight: "bolder", color: "#07874d" }}>
                tone{" "}
              </span>
              :{"  "}
            </label>
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="outline-success"
              checked={withemoji}
              value={true}
              style={{
                borderRadius: "21px",
                marginRight: "5vh",
                width: "13vh",
                height: "auto",
                fontSize: "13px",
                paddingTop: "5px",
                paddingBottom: "5px"
              }}
              onChange={(e) => setWithemoji(e.currentTarget.checked)}
            >
              With Emoji
            </ToggleButton>
          </div>
          <ToggleButtonGroup
            className="btn d-flex justify-content-center flex-wrap align-items-center gap-2"
            type="radio"
            name="tone-options"
            size="sm"
            value={tones}
            onChange={handelOnChangeTone}
            style={{ paddingLeft: "0px" }}
          >
            {tones_temps.map((tones_temp, index) => (
              <ToggleButton
                className="d-flex justify-content-center flex-between align-items-center gap-4"
                variant="outline-light"
                id={tones_contents[tones_temp][1]}
                key={index}
                value={tones_contents[tones_temp][0]}
                style={{
                  borderRadius: "21px",
                  marginRight: "2vh",
                  marginLeft: "2vh",
                  width: "25vh",
                  height: "auto",
                  fontSize: "15px",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}
              >
                {tones_temp}
                <div style={{ fontSize: "15px" }}>
                  {withemoji && <div>{tones_contents[tones_temp][2]}</div>}
                </div>
              </ToggleButton>
            ))}
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
          <div className="d-flex justify-content-start mt-4">
            <Button
              variant="warning"
              type="submit"
              style={{ borderRadius: "20px", width: "20vh" }}
              disabled
            >
              Loading..
            </Button>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              variant="success"
              type="submit"
              onClick={handleOnClick}
              style={{ borderRadius: "20px", width: "20vh" }}
            >
              Submit
            </Button>
            <ToggleButton
              id="toggle-check-img"
              type="checkbox"
              variant="outline-success"
              checked={withimg}
              value={true}
              style={{
                borderRadius: "21px",
                width: "13vh",
                height: "auto",
                fontSize: "13px",
                paddingTop: "5px",
                paddingBottom: "5px"
              }}
              onChange={(e) => setWithimg(e.currentTarget.checked)}
            >
              With Images
            </ToggleButton>
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
                      value={
                        withemoji ? item.content.trim() : item.content.trim()
                      }
                      disabled
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        paddingLeft: "20px",
                        paddingRight: "10px"
                      }}
                    />
                  </Form.Group>
                  {withimg && (
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
                          className="img-fluid img-thumbnail rounded mx-auto d-block p-3 bg-transparent border-0 w-auto"
                          src={item.imgurl}
                          alt={blankimg}
                        ></Image>
                      </div>
                    </Form.Group>
                  )}
                </Form>
              </div>
            ))}
            {/* <div className="bg-transparent pt-3 pb-3">
              <Form.Group className="pt-3 pb-3 fs-5">
                <Form.Label
                  className="align-self-lg-start"
                  column
                  style={{ fontWeight: "bolder", color: "#07874d" }}
                >
                  Intro Summary Text
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
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
