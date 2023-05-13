import React, { useEffect, useState } from "react";
import blankimg from "../img/blank.png";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export default function MainScreen() {
  const [newsurl, setNewsurl] = useState("");
  const [prompt, setPrompt] = useState("");

  const [data, setData] = useState([]);
  const [totalsum, setTotalsum] = useState("");

  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_BASEURL;

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

    if (newsurl === "" || prompt === "") {
      alert("Please input URL and Prompt");
    } else {
      const lines = newsurl.split("\n");
      const urls = lines.map((line) => line.trim());
      urlCheck = urls.map((url) => {
        return checkUrl(url);
      });

      if (urlCheck.every((value) => value === true)) {
        const body = { urls: urls, prompt: prompt };
        setLoading(true);
        const res = await axios.post(baseURL + "/article", body);
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
  const handleOnChangeProm = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  };

  return (
    <div>
      <header className="mainscreen-header">NEWSLETTER AI</header>
      <body
        style={{
          paddingLeft: "5%",
          paddingRight: "10%",
          backgroundColor: "#1f2423",
          paddingBottom: "2rem",
          minHeight: "90vh"
        }}
      >
        <Form className="mb-4">
          <Form.Group
            className="pt-5 pb-4 fs-5 d-flex justify-content-between"
            as={Row}
          >
            <Col sm={3}>
              <Form.Label className="text-white align-self-lg-start" column>
                Input News article URL's
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                className="fs-6 bg-body"
                co
                as="textarea"
                rows={5}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Article URLs"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className="pt-3 pb-4 fs-5 d-flex justify-content-between"
            as={Row}
          >
            <Col sm={3}>
              <Form.Label className="text-white align-self-lg-start" column>
                Input/Edit Prompt
              </Form.Label>
            </Col>
            <Col className="align-self-center" sm={9}>
              <Form.Control
                className="fs-6"
                onChange={(e) => {
                  handleOnChangeProm(e);
                }}
                placeholder="Prompt"
              />
            </Col>
          </Form.Group>

          {loading ? (
            <div className="d-flex justify-content-end">
              <Button variant="warning" type="submit" disabled>
                Loading..
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit" onClick={handleOnClick}>
                Submit
              </Button>
            </div>
          )}
        </Form>
        {loading ? (
          <div className="process-bar">
            <Box sx={{ display: "flex" }}>
              <CircularProgress size={100} />
            </Box>
          </div>
        ) : (
          <div>
            {data.map((item, index) => (
              <div key={index}>
                <Form className="bg-black pb-3 mb-3 p-lg-5 rounded-4">
                  <Form.Group
                    className="pt-1 fs-5 d-flex justify-content-between"
                    as={Row}
                  >
                    <Col sm={3}>
                      <Form.Label
                        className="text-white align-self-lg-start fs-5"
                        column
                      >
                        URL
                      </Form.Label>
                    </Col>
                    <Col className="align-self-center" sm={9}>
                      <Form.Control
                        className="fs-6"
                        value={item.url}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="pt-3 fs-5 d-flex justify-content-between"
                    as={Row}
                  >
                    <Col sm={3}>
                      <Form.Label
                        className="text-white align-self-lg-start"
                        column
                      >
                        Headline
                      </Form.Label>
                    </Col>
                    <Col className="align-self-center" sm={9}>
                      <Form.Control
                        className="fs-5"
                        value={item.headline}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="pt-3 pb-3 fs-5 d-flex justify-content-between"
                    as={Row}
                  >
                    <Col sm={3}>
                      <Form.Label
                        className="text-white align-self-lg-start"
                        column
                      >
                        Contents
                      </Form.Label>
                    </Col>
                    <Col className="align-self-center" sm={9}>
                      <Form.Control
                        className="fs-6"
                        as="textarea"
                        rows={8}
                        value={item.content.trim()}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <div
                    className="pt-3 fs-5 d-flex justify-content-between"
                    as={Row}
                  >
                    <Col sm={3}>
                      <Form.Label
                        className="text-white align-self-lg-start"
                        column
                      >
                        Image
                      </Form.Label>
                    </Col>
                    <Col className="align-self-center" sm={9}>
                      <Image
                        className="img-fluid img-thumbnail rounded mx-auto d-block"
                        src={item.imgurl}
                        alt={blankimg}
                        width="600px"
                      ></Image>
                    </Col>
                  </div>
                </Form>
              </div>
            ))}
            <div className="bg-black pt-3 pb-3 p-lg-4 rounded-4">
              <Form.Group
                className="pt-3 fs-5 d-flex justify-content-between"
                as={Row}
              >
                <Col sm={3}>
                  <Form.Label className="text-white align-self-lg-start" column>
                    Intro Summary Text
                  </Form.Label>
                </Col>
                <Col className="align-self-center" sm={9}>
                  <Form.Control
                    className="fs-6"
                    as="textarea"
                    rows={10}
                    value={totalsum.trim()}
                    disabled
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        )}
      </body>
      <footer className="text-center text-white bg-black">
        RESERVED BY LEO
      </footer>
    </div>
  );
}
