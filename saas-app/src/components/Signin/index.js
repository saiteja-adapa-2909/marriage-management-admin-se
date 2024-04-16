import React, { useState } from "react";
import "./index.css";
import baseURL from "../../links.js";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Signin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const checkEmail = async (email) => {
    console.log(email, "in checkEMAIl");
    try {
      const response = await axios.get(`${baseURL}/checkemail/${email}`);
      if (response.data.length > 0) {
        console.log("Email already exists", response.data);
        localStorage.setItem("designerid", response.data[0].designer_id);
        console.log(localStorage.getItem("designerid"), "in signin");
        navigate("/home/dashboard");
      } else {
        console.log("YOU ARE A NEW USER HEHEHHE");
        navigate("/signup");
      }
      console.log(response.data);
    } catch (error) {
      console.log("You got an error in checkEmail function");
      console.error(error);
    }
  };

  return (
    <div className="d-flex signin-container justify-content-center align-items-center">
      <div className="rounded  shadow d-flex flex-column justify-content-center align-items-center p-4">
        <h5>Signin</h5>
        <p>to continue to designer-admin</p>
        <div className="d-flex justify-content-center mt-3">
          <GoogleOAuthProvider
            clientId="471504582242-eq5bu6ekkh1g8qbabj5vv8j94bq70fnh.apps.googleusercontent.com"
            className="google"
          >
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const details = await jwtDecode(credentialResponse.credential);
                localStorage.setItem("jwtToken", details.jti);
                console.log(details.jti);

                console.log(details);
                // console.log(details.name);
                // console.log(details.email);
                setName(details.name);
                setEmail(details.email);
                checkEmail(details.email);
              }}
              onError={(e) => {
                console.log(e);
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
export default Signin;
