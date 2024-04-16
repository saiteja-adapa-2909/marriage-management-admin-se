import React, { useState } from "react";
import UploadWidget from "../CreateProduct/UploadWidget";

import "./index.css";
import baseURL from "../../links";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const navigate = useNavigate();

  const handleChange = (event, setState) => {
    const value = event.target.value;
    setState((prev) => ({
      ...prev,
      value: value,
    }));
  };
  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  const handleBlur = (event, setState) => {
    const value = event.target.value;
    setState((prev) => ({
      ...prev,
      borderColor: value === "" ? "red" : "grey",
      boxShadow: value === "" ? "0 0 10px red" : "none",
    }));
  };

  const [fname, setFname] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [lname, setLname] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [email, setEmail] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [phone, setPhone] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [dob, setDob] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [ad1, setAd1] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [ad2, setAd2] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [city, setCity] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const [pincode, setPincode] = useState({
    value: "",
    borderColor: "",
    boxShadow: "none",
  });

  const handleSubmit = async () => {
    const data = {
      fname: fname.value,
      lname: lname.value,
      phone: phone.value.toString(),
      email: email.value,
      dob: dob.value,
      ad1: ad1.value,
      ad2: ad2.value,
      city: city.value,
      pincode: pincode.value,
      image: url,
    };

    if (
      data.fname === "" ||
      data.lname === "" ||
      data.phone === "" ||
      data.email === "" ||
      data.dob === "" ||
      data.ad1 === "" ||
      data.city === "" ||
      data.pincode === "" ||
      data.image === "" 
    ) {
      alert("Fill all the fields to continue.");
    } else {
      console.log(data);
      try {
        const response = await axios.post(`${baseURL}/createdesigner`, data);
        if (response.status === 200) {
          alert("Added successfully");
          console.log(response);
          navigate("/home/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="d-flex  signin-container justify-content-center align-items-center b">
      <div className="rounded shadow d-flex flex-column  align-items-center p-4">
        <h5>Welcome</h5>
        <p>
          Please fill in the details so that the customers can know you more.
        </p>
        <div className=" mt-4 d-flex flex-container justify-content-center">
          <div className="col-12 mx-2 p-2">
            <UploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button
                    onClick={handleOnClick}
                    className="btn btn-dark d-flex flex-container justify-content-center text-light cp-button-style3"
                  >
                    Upload your image
                  </button>
                );
              }}
            </UploadWidget>

            {error && <p>{error}</p>}

            {url && (
              <>
                <p className="p-img-upload">Image uploaded successfully!</p>
              </>
              // <div className="d-flex flex-column">
              //   <p>
              //     <img
              //       src={url}
              //       alt="Uploaded resource"
              //       className="uploaded_image"
              //     />
              //   </p>
              //   <p>{url}</p>
              // </div>
            )}
          </div>
        </div>
        <div className="d-flex align-items-left flex-column w-100">
          <div className="d-flex justify-content-left align-items-center gap-2 ">
            <div className="">
              <label className="form-label m-0 label-styling" htmlFor="fname">
                First name
              </label>
              <input
                style={{
                  borderColor: fname.borderColor,
                  boxShadow: fname.boxShadow,
                }}
                type="text"
                className="form-control upload-button-style custom-file-input"
                id="fname"
                value={fname.value}
                onChange={(event) => handleChange(event, setFname)}
                onBlur={(event) => handleBlur(event, setFname)}
              />
            </div>
            <div className="">
              <label className="form-label m-0 label-styling" htmlFor="lname">
                Last name
              </label>
              <input
                style={{
                  borderColor: lname.borderColor,
                  boxShadow: lname.boxShadow,
                }}
                type="text"
                className="form-control upload-button-style custom-file-input"
                id="lname"
                value={lname.value}
                onChange={(event) => handleChange(event, setLname)}
                onBlur={(event) => handleBlur(event, setLname)}
              />
            </div>
          </div>
          <div className="d-flex  flex-column justify-content-left gap-2 w-100">
            <div className="col-12 col-md-12">
              <label className="form-label m-0 label-styling" htmlFor="email">
                Email Address
              </label>
              <input
                style={{
                  borderColor: email.borderColor,
                  boxShadow: email.boxShadow,
                  width: "100%",
                }}
                type="email"
                className="form-control upload-button-style custom-file-input"
                id="email"
                value={email.value}
                onChange={(event) => handleChange(event, setEmail)}
                onBlur={(event) => handleBlur(event, setEmail)}
              />
            </div>
          </div>
          <div className="d-flex align-items-left flex-column w-100">
            <div className="d-flex justify-content-left align-items-center gap-2">
              <div className="">
                <label className="form-label m-0 label-styling" htmlFor="phone">
                  Phone
                </label>
                <input
                  style={{
                    borderColor: phone.borderColor,
                    boxShadow: phone.boxShadow,
                    width: "100%",
                  }}
                  type="tel"
                  className="form-control upload-button-style custom-file-input"
                  id="phone"
                  value={phone.value}
                  onChange={(event) => handleChange(event, setPhone)}
                  onBlur={(event) => handleBlur(event, setPhone)}
                />
              </div>
              <div className="">
                <label className="form-label m-0 label-styling" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  style={{
                    borderColor: dob.borderColor,
                    boxShadow: dob.boxShadow,
                    width: "100%",
                  }}
                  type="date"
                  className="form-control upload-button-style custom-file-input"
                  id="dob"
                  value={dob.value}
                  onChange={(event) => handleChange(event, setDob)}
                  onBlur={(event) => handleBlur(event, setDob)}
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 w-100">
            <div className="">
              <label className="form-label m-0 label-styling" htmlFor="ad1">
                Address Line 1
              </label>
              <input
                style={{
                  borderColor: ad1.borderColor,
                  boxShadow: ad1.boxShadow,
                  width: "100%",
                }}
                type="text"
                className="form-control upload-button-style custom-file-input"
                id="ad1"
                value={ad1.value}
                onChange={(event) => handleChange(event, setAd1)}
                onBlur={(event) => handleBlur(event, setAd1)}
              />
            </div>
            <div className="">
              <label className="form-label m-0 label-styling" htmlFor="ad2">
                Address Line 2
              </label>
              <input
                style={{
                  borderColor: ad2.borderColor,
                  boxShadow: ad2.boxShadow,
                  width: "100%",
                }}
                type="text"
                className="form-control upload-button-style custom-file-input"
                id="ad2"
                value={ad2.value}
                // onChange={(event) => handleChange(event, setAd2)}
                // onBlur={(event) => handleBlur(event, setAd2)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-left align-items-center gap-2 w-100">
            <div className="">
              <label className="form-label m-0 label-styling" htmlFor="city">
                City
              </label>
              <input
                style={{
                  borderColor: city.borderColor,
                  boxShadow: city.boxShadow,
                }}
                type="text"
                className="form-control upload-button-style custom-file-input"
                id="city"
                value={city.value}
                onChange={(event) => handleChange(event, setCity)}
                onBlur={(event) => handleBlur(event, setCity)}
              />
            </div>
            <div className="">
              <label className="form-label m-0 label-styling" htmlFor="pincode">
                Pincode
              </label>
              <input
                style={{
                  borderColor: pincode.borderColor,
                  boxShadow: pincode.boxShadow,
                }}
                type="text"
                className="form-control upload-button-style custom-file-input"
                id="pincode"
                value={pincode.value}
                onChange={(event) => handleChange(event, setPincode)}
                onBlur={(event) => handleBlur(event, setPincode)}
              />
            </div>
          </div>
          <div className="d-flex flex-container justify-content-center align-items-center">
            <button
              className="btn btn-dark text-light border-0 mt-4 text-center cp-button-style2"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
