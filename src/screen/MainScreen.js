import React, { useEffect, useState } from "react";
import blankimg from "../img/blank.png";
import axios from "axios";

import LoadingButton from "./LoadingButton";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
      <div className="mainscreen-header">Newsletter AI</div>
      <div className="input-items">
        <div className="input-url-prompt">
          <div>
            <label>Please input Newsletter URL</label>
            <textarea
              rows={6}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div>
            <label>Please input Prompt</label>
            <textarea
              onChange={(e) => {
                handleOnChangeProm(e);
              }}
            />
          </div>
        </div>
        <div className="input-btn">
          <LoadingButton onClick={handleOnClick}>Submit</LoadingButton>
        </div>
      </div>
      {loading ? (
        <div className="process-bar">
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={100} />
          </Box>
        </div>
      ) : (
        <div className="result">
          {data.map((item, index) => (
            <div className="result-main" key={index}>
              <div className="result-url">
                <label>URL</label>
                <textarea value={item.url} readOnly />
              </div>
              <div>
                <label>Headline</label>
                <textarea value={item.headline} readOnly />
              </div>
              <div>
                <label>Content</label>
                <textarea rows={15} value={item.content.trim()} readOnly />
              </div>
              <div className="result-image">
                <label>Image</label>
                <img src={item.imgurl} alt={blankimg} />
              </div>
            </div>
          ))}
          <div className="result-total">
            <label>Total Summarize</label>
            <textarea rows={10} value={totalsum.trim()} readOnly />
          </div>
        </div>
      )}
    </div>
  );
}
