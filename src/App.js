import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import { Route, Routes, useLocation } from "react-router-dom";
import MainScreen from "./screen/MainScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
// import store from "./store";
// import { history } from "./helpers/history";
import { clearMessage } from "./actions/message";
import { useState } from "react";
import { useEffect } from "react";
// import { useCallback } from "react";
// import { logout } from "./actions/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileScreen from "./screen/ProfileScreen";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  // const logOut = useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/mainscreen" element={<MainScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
