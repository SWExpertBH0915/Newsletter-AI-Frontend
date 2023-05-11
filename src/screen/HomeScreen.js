import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="header-nav">
          <Link to="/">Demo</Link>
          <Link to="/">Contact</Link>
        </div>
        <div className="header-title">
          <h2>Newsletter AI</h2>
        </div>
        <div className="header-action">
          <button
            onClick={() => {
              navigate("/newlettergenerate");
            }}
          >
            GET STARTED
          </button>
        </div>
      </div>
      <div className="contents">
        <div className="contents-demo">
          <div className="typeit">
            Let's Generate <br />
            Newsletter
            <br /> with AI!
          </div>
          <a href="/newlettergenerate">WATCH DEMO</a>
        </div>
        <div className="contents-discription">
          <h1>HOW IT WORKS</h1>
          <div className="contents-items">
            <div className="contents-item">
              <h2>1. EMAIL LINKS</h2>
              <p>
                Just send links to the articles you want to include to
                <br />
                receiving@parse.redense.com
              </p>
            </div>
            <div className="contents-item">
              <h2>2. LET OUR AI DO ITS MAGIC</h2>
              <p>
                Our service leverages GPT3.5 and GPT4 to parse your links to
                create an AI generated headline and description.
              </p>
            </div>
            <div className="contents-item">
              <h2>3. BUILD YOUR NEWSLETTER</h2>
              <p>
                Build your newsletter at the end of the day. Our AI will write a
                newsletter that lets you get started.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <h3>@Newsletter AI 2023</h3>
      </div>
    </>
  );
}
