import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

export default function ProfileScreen() {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div style={{ height: "18vh" }}>
      <div className="main-header home-main bg-black mb-0 bg-gradient py-3">
        <Header />
      </div>
      <div className="bg-black" style={{ height: "110vh" }}>
        <div className="text-white d-flex flex-column justify-content-center align-content-center w-100">
          <div>
            <h1>{currentUser.username}</h1>
          </div>
          <div>
            <h4>Email: {currentUser.email}</h4>
          </div>
          <div>
            <label className="fs-4">
              Premium remains{" "}
              <span
                style={{
                  fontWeight: "bolder",
                  color: "#07874d"
                }}
              >
                {currentUser.expiredays}
              </span>{" "}
              days
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
