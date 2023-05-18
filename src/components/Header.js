import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Mobile_Drop from "../img/mobile-dropdown.PNG";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { CLEAR_MESSAGE } from "../actions/types";
import { ReactComponent as LogoIcon } from "../img/icon.svg";
import { ReactComponent as UserAvatar } from "../img/user.svg";

export default function Header() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(CLEAR_MESSAGE()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="main-header row pt-4 p-0 m-0">
      <div className="main-site-name col-2 p-0 d-flex justify-content-start align-items-center">
        <div id="main-vector-img">
          <LogoIcon />
        </div>
        <label className="main-site-text text-white mt-0 ms-3">BUGLE AI</label>
      </div>
      <div className="col-6 ps-5 d-flex justify-content-start align-items-center">
        <button
          className="btn btn-default fs-6 text-white border-white rounded-5 me-5"
          onClick={() => {
            navigate("/mainscreen");
          }}
        >
          WATCH DEMO
        </button>
        <button
          className="btn btn-md btn-success rounded-5"
          style={{}}
          onClick={() => {
            navigate("/login");
          }}
        >
          GET STARTED
        </button>
      </div>

      <div className="col-4 p-0 d-flex justify-content-end align-items-center">
        <button
          id="btn-contact"
          className="btn btn-md btn-default text-white border-white rounded-5 me-5"
          onClick={() => {
            navigate("/");
          }}
        >
          Contact Us
        </button>
        {currentUser ? (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="text-white me-2">{currentUser.username}</div>
            <button
              onClick={logOut}
              className="btn-logout btn btn-default fs-6 text-white border-white rounded-5 ps-2 pe-2 m-0 w-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <div
              id="main-header-user"
              onClick={() => {
                navigate("/login");
              }}
            >
              <UserAvatar />
            </div>
            <img
              className="main-header-drop"
              style={{ width: "40px", height: "40px" }}
              src={Mobile_Drop}
              alt=""
            ></img>
          </div>
        )}
      </div>
    </div>
  );
}
