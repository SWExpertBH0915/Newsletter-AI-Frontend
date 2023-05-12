import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen1 from "./screen/MainScreen1";
import BasicExample from "./screen/BasicExample";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/newlettergenerate" element={<MainScreen1 />} />
          <Route path="/basic" element={<BasicExample />} />

          <Route path="/login" element={<Login />} />
          <Route path="/resigter" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
