import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calculator from "./pages/calculator/calculator";
import History from "./pages/history/history";
import axios from "axios";
import IpAddress from "./components/IpAddress";
import "./sidebar.css";
import "./App.css";

export default function App() {
  const [ip, setIp] = useState(0);
  const [connect, setConnect] = useState(false);
  function Toggle() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
  }

  async function getIp() {
    const response = await axios.get("https://api.ipify.org?format=json");
    setIp(response.data.ip);
    setConnect(true)
  }

  useEffect(() => {
    getIp();
  });
  return (
    <Router>
      <div className="sidebar">
        <div className="logo_content">
          <div className="logo">
            <i className="bx bxs-calculator"></i>
            <div className="logo_name">Calculator</div>
          </div>
          <i className="bx bx-menu" id="btn" onClick={Toggle}></i>
        </div>
        <ul className="nav_list">
          <li>
            <Link to="/">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Calculator</span>
            </Link>
            <span className="tooltip">Calculator</span>
          </li>
          <li>
            <Link to="/history">
              <i className="bx bx-folder"></i>
              <span className="links_name">History</span>
            </Link>
            <span className="tooltip">History</span>
          </li>
        </ul>
        <div className="profile_content">
          <IpAddress ip={ip} connect={connect}  />
        </div>
      </div>

      <div className="home_content">
        <Routes>
          <Route path="/" element={<Calculator address={ip} />}></Route>
          <Route path="/history" element={<History ip={ip} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
