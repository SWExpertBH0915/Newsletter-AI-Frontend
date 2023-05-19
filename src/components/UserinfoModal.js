import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ReactComponent as LogoIcon } from "../img/icon.svg";
import { ReactComponent as UserAvatar } from "../img/user.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function UserinfoModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div>
      <Modal
        className="modal-user-info"
        show={isOpen}
        onHide={onClose}
        keyboard={false}
        centered={true}
        size="md"
      >
        <Modal.Header
          className="bg-dark border-bottom-0"
          closeButton
          closeVariant="white"
        >
          <Modal.Title>
            <div className="p-0 d-flex justify-content-start align-items-center">
              <div>
                <LogoIcon />
              </div>
              <label className="text-white mt-0 ms-3 fs-4">BUGLE AI</label>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="bg-dark text-white"
          style={{ outline: "none !important" }}
        >
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "40px",
                  backgroundColor: "#198754",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <UserAvatar
                  style={{
                    width: "40px",
                    height: "40px"
                  }}
                />
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="mt-4 btn btn-default fs-6 text-white border-white rounded-5 w-50"
                onClick={() => {
                  navigate("/mainscreen");
                }}
              >
                WATCH DEMO
              </button>
              <button
                className="mt-4 btn btn-default fs-6 text-white border-white rounded-5 w-50"
                onClick={() => {
                  navigate("/");
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <button
              className="btn btn-md btn-success rounded-5"
              style={{ marginTop: "5vh", marginBottom: "5vh" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              GET STARTED
            </button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer className="bg-dark border-0">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
