import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import checkToken from "../../Middleware";
import Revenue from "../Linechart/revenue";
import Sales from "../Linechart/sales";
import { LineChart } from "lucide-react";
import { Boxes, IndianRupee } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Use the middleware function to check the token
    const isAuthenticated = checkToken();
    if (!isAuthenticated) {
      // Redirect or handle unauthorized access
      // For example, redirect to the login page
      console.log("Not authenticated");
      navigate("/");
    } else {
      console.log("User authenticated");
    }
  }, []);
  const [activeTab1, setActiveTab1] = useState("1D");
  const [activeTab2, setActiveTab2] = useState("1D");

  const handleTabClick1 = (tab) => {
    setActiveTab1(tab);
  };
  const handleTabClick2 = (tab) => {
    setActiveTab2(tab);
  };

  const renderTabContent1 = () => {
    switch (activeTab1) {
      case "1D":
        return (
          <>
            <p className="graph-text">Last Day's Revenue:</p>
          </>
        );
      case "1W":
        return (
          <>
            <p className="graph-text">Last Week's Revenue:</p>
          </>
        );
      case "1M":
        return (
          <>
            <p className="graph-text">Last Month's Revenue:</p>
          </>
        );
      case "6M":
        return (
          <>
            <p className="graph-text">Last 6 Months' Revenue:</p>
          </>
        );
      default:
        return null;
    }
  };
  const renderTabContent2 = () => {
    switch (activeTab2) {
      case "1D":
        return (
          <>
            <p className="graph-text">Last Day's Sales:</p>
          </>
        );
      case "1W":
        return (
          <>
            <p className="graph-text">Last Week's Sales:</p>
          </>
        );
      case "1M":
        return (
          <>
            <p className="graph-text">Last Month's Sales:</p>
          </>
        );
      case "6M":
        return (
          <>
            <p className="graph-text">Last 6 Months' Sales:</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="dashboard-header">
        <h1 className="head-style">Dashboard</h1>
        <p>Overview of your store</p>
      </div>
      <hr className="hr-style" />

      <div className="d-flex flex-column justify-content-center px-5 py-3">
        <div className="row d-flex justify-content-center ">
          <div className="col-lg-4 p-2">
            <div className="boxes rounded py-1 ">
              <div className="d-flex justify-content-between">
                <p className="cont-head">Total Revenue</p>
                <span className="me-3 mt-1">
                  <IndianRupee />
                </span>
                {/* <p className="font-weight-normal me-3">{"\u20B9"}</p> */}
              </div>
              <h3 className="cont-p-style font-weight-900 ms-3">
                {"\u20B9"} 0.00
              </h3>
            </div>
          </div>
          <div className="col-lg-4 p-2 ">
            <div className="boxes rounded py-1 ">
              <div className="d-flex justify-content-between ">
                <p className="cont-head">Sales</p>
                <span className="me-3 mt-1">
                  <LineChart />
                </span>
              </div>
              <h3 className="cont-p-style font-weight-900 ms-3">+0</h3>
            </div>
          </div>
          <div className="col-lg-4 p-2">
            <div className="boxes rounded py-1 ">
              <div className="d-flex justify-content-between">
                <p className="cont-head">Products In Stock</p>
                <span className="me-3 mt-1">
                  <Boxes />
                </span>
              </div>
              <h3 className="cont-p-style font-weight-900 ms-3">0</h3>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center align-items-center gap-4 mt-5 graphs rounded shadow">
          <h4 className="ms-4 mt-4">Overview</h4>
          <div className="row d-flex justify-content-center align-items-center gap-4">
            <div className="col-lg-5 col-10 rounded graph ">
              <p className=" graph-text">Last Month's Revenue:</p>
              <p className=" graph-text">This Month's Revenue:</p>
              <hr className="hr-style" />

              <div className="d-flex mt-2">
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab1 === "1D" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick1("1D")}
                >
                  1D
                </button>
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab1 === "1W" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick1("1W")}
                >
                  1W
                </button>
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab1 === "1M" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick1("1M")}
                >
                  1M
                </button>
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab1 === "6M" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick1("6M")}
                >
                  6M
                </button>
              </div>
              <div className="mt-3">{renderTabContent1()}</div>
            </div>
            <div className="col-lg-6 col-10 rounded">
              <Revenue />
            </div>
          </div>
          {/* SECOND GRAPH */}
          <div className="row d-flex justify-content-center align-items-center gap-4">
            <div className="col-lg-6 col-10 rounded">
              <Sales />
            </div>
            <div className="col-lg-5 col-10 rounded graph">
              <p className="graph-text">Last Month's Sales:</p>
              <p className="graph-text">This Month's Sales:</p>
              <hr className="hr-style" />
              <div className="d-flex mt-2">
                <button
                  className={`rounded p-2 mx-2 cp-button-style  ${
                    activeTab2 === "1D" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick2("1D")}
                >
                  1D
                </button>
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab2 === "1W" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick2("1W")}
                >
                  1W
                </button>
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab2 === "1M" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick2("1M")}
                >
                  1M
                </button>
                <button
                  className={`rounded p-2 mx-2 cp-button-style ${
                    activeTab2 === "6M" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick2("6M")}
                >
                  6M
                </button>
              </div>
              <div className="mt-3">{renderTabContent2()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
