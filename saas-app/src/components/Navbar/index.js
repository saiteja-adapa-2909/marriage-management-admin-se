import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDesignerData } from "../../reduxstore/dataslice";

const Navbar = () => {
  const data = useSelector((state) => {
    return state.app.designer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching getDesignerData");
    dispatch(getDesignerData());
  }, [dispatch]);
  console.log(data);
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleLogout = () => {
    console.log("clicked logout");
    localStorage.removeItem("designerid");
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg p-3 border nav-styles bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/home/dashboard" className="navbar-brand li-style-head">
            Artsy.
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className={`nav-item li-style ${
                  activeTab === "Overview" ? "activeNav" : ""
                }`}
              >
                <Link
                  to="/home/dashboard"
                  className="nav-link"
                  onClick={() => handleTabClick("Overview")}
                >
                  Overview
                </Link>
              </li>
              <li
                className={`nav-item li-style ${
                  activeTab === "Chats" ? "activeNav" : ""
                }`}
              >
                <Link
                  to="#"
                  className="nav-link"
                  onClick={() => handleTabClick("Chats")}
                >
                  Chats
                </Link>
              </li>
              <li
                className={`nav-item li-style ${
                  activeTab === "Products" ? "activeNav" : ""
                }`}
              >
                <Link
                  to="/home/products"
                  className="nav-link"
                  onClick={() => handleTabClick("Products")}
                >
                  Products
                </Link>
              </li>
              <li
                className={`nav-item li-style ${
                  activeTab === "Orders" ? "activeNav" : ""
                }`}
              >
                <Link
                  to="/home/orders"
                  className="nav-link"
                  onClick={() => handleTabClick("Orders")}
                >
                  Orders
                </Link>
              </li>
              <li className="nav-item li-style">
                <p className="rounded nav-link" id="google_translate"></p>
              </li>
            </ul>
            <div className="d-flex">
              <div className="dropleft dropdown-styling">
                <img
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  // aria-expanded="false"
                  src={data.designer_image}
                  alt="FAILED TO LOAD"
                  style={{ width: "40px", height: "40px" }}
                />
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item dropdown-item-styling"
                      to="#"
                    >
                      Profile
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li> */}
                  <li>
                    <button
                      className="btn dropdown-item dropdown-item-styling"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
