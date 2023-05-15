import React, { useEffect, useState } from "react";
import blankimg from "../img/blank.png";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function MainScreen() {
  const [newsurl, setNewsurl] = useState("");
  const [prompt, setPrompt] = useState(
    "Summarize this article into 3 to 5 bullet points, using humour and an educational style"
  );
  const [totalProm, setTotalProm] = useState("");
  const [tones, setTones] = useState("serious");
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

    if (newsurl === "" || prompt === "" || totalProm === "") {
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
          prompt: prompt,
          totalProm: totalProm,
          tones: tones
        };
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
  const handelOnChangeTprom = (e) => {
    e.preventDefault();
    setTotalProm(e.target.value);
  };

  const handelOnChangeTone = (val) => setTones(val);
  return (
    <div>
      <div className="bg-black">
        <Link className="bg-black" to="/">
          <FaHome
            style={{
              color: "white",
              width: "2rem",
              height: "2rem",
              marginLeft: "2rem",
              marginTop: "1rem"
            }}
          />
        </Link>
        <div className="mainscreen-header">BUGLE AI</div>
      </div>

      <div
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          backgroundColor: "black",
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
                Input News Article URL's
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                className="fs-6 bg-body"
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
                defaultValue="Summarize this article into 3 to 5 bullet points, using humour and an educational style"
                placeholder="Prompt"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className="pt-3 pb-4 fs-5 d-flex justify-content-between"
            as={Row}
          >
            <Col sm={3}>
              <Form.Label className="text-white align-self-lg-start" column>
                Input/Edit Total Summary Prompt
              </Form.Label>
            </Col>
            <Col className="align-self-center" sm={9}>
              <Form.Control
                className="fs-6"
                onChange={(e) => {
                  handelOnChangeTprom(e);
                }}
                placeholder="Total Summary Prompt"
              />
            </Col>
          </Form.Group>
          <Form.Group
            className="pt-3 pb-4 fs-5 d-flex justify-content-between"
            as={Row}
          >
            <Col sm={3}>
              <Form.Label className="text-white align-self-lg-start" column>
                Tones
              </Form.Label>
            </Col>
            <Col className="align-self-center" sm={9}>
              <ToggleButtonGroup
                className="btn"
                type="radio"
                name="options"
                size="sm"
                value={tones}
                onChange={handelOnChangeTone}
              >
                <ToggleButton
                  variant="secondary"
                  id="tbg-btn-1"
                  value="serious"
                >
                  Serious
                </ToggleButton>
                <ToggleButton variant="secondary" id="tbg-btn-2" value="humour">
                  Humour
                </ToggleButton>
                <ToggleButton
                  variant="secondary"
                  id="tbg-btn-3"
                  value="education"
                >
                  Education
                </ToggleButton>
              </ToggleButtonGroup>
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
        <div className="text-white fs-2 p-xl-3">Reault</div>
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
                <Form className="bg-black pb-3 mb-3 p-lg-5 rounded-4 border border-white">
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
                  <Form.Group
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
                        // width="600px"
                      ></Image>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            ))}
            <div className="bg-black pt-3 pb-3 p-lg-4 rounded-4 border border-white">
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
      </div>
      {/* <footer className="text-center text-white bg-black">
        RESERVED BY LEO
      </footer> */}
    </div>
  );
}
