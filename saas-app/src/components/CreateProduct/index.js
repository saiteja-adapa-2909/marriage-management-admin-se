import React, { useState, useEffect } from "react";
// import OPENAI_API_KEY from './config/openai';
import OpenAIChat from "../OpenAI/openai";
// import { client } from "@gradio/client";
import UploadWidget from "./UploadWidget/UploadWidget";
import checkToken from "../../Middleware";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../links";

import Dictaphone from "../Speech/Dictaphone";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const CreateProduct = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [response, setResponse] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://api.openai.com/v1/chat/completions",
  //         {
  //           prompt: "Tell me how many states are there in India",
  //           max_tokens: 100,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${OPENAI_API_KEY}`,
  //           },
  //         }
  //       );
  //       setResponse(response.data.choices[0].text);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState(null);
  useEffect(() => {
    // Use the middleware function to check the token
    const isAuthenticated = checkToken();
    if (!isAuthenticated) {
      // Redirect or handle unauthorized access
      // For example, redirect to the login page
      console.log("not authenticated");
      navigate("/");
    } else {
      console.log("User authenticated");
    }
  }, []);
  const [boldText, setBoldText] = useState(""); // New state to store bold text
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const designerid = localStorage.getItem("designerid");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  // const [subCategory, setSubCategory] = useState("");
  const [archive, setArchive] = useState(false);
  const [image, setImage] = useState("");
  const [borderColor1, setBackgroundColor1] = useState("");
  const [shadowColor1, setShadowColor1] = useState("white");
  const [borderColor, setBackgroundColor2] = useState("");
  const [shadowColor, setShadowColor2] = useState("white");
  const [json,setJson] = useState([]);

  const updateStateFnCall = async () => {
    const data = {
      designerid: designerid,
      name: name,
      desc: desc,
      price: price,
      archive: archive,
      image: image,
      category: category,
      // subCategory: subCategory,
    };
    if (
      data.designerid === "" ||
      data.name === "" ||
      data.desc === "" ||
      data.price === "" ||
      data.archive === "" ||
      data.image === "" ||
      data.category === ""
    ) {
      alert("Fill all the fields to continue.");
    } else {
      console.log(data);
      try {
        const response = await axios.post(`${baseURL}/createproduct`, data);
        if (response.status === 200) {
          alert("Added successfully");
          console.log(response);
          navigate("/home/products");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleTagChange = (event, setState) => {
    const inputValue = event.target.value;
    const lastCharacter = inputValue.slice(-1);

    // If the last character is a comma, make the preceding word bold
    if (lastCharacter === ",") {
      console.log("Comma");
      const words = inputValue.split(",");
      const lastWord = words[words.length - 2].trim();
      setBoldText(lastWord);
    } else {
      setBoldText("");
    }

    setState(inputValue);
  };

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setArchive(event.target.checked);
  };

  const handleDropdownChange1 = (event) => {
    setCategory(event.target.value);
  };

  const prodNameChange = (event) => {
    handleChange(event, setName);

    if (event.target.value === "") {
      setBackgroundColor1("red");
      setShadowColor1("red");
      alert("Enter product name");
    } else {
      setBackgroundColor1("grey");
      setShadowColor1("white");
    }
  };

  const prodName2Change = (event) => {
    handleChange(event, setDesc);

    if (event.target.value === "") {
      setBackgroundColor2("red");
      setShadowColor2("red");
      alert("Enter product description");
    } else {
      setBackgroundColor2("grey");
      setShadowColor2("white");
    }
  };
  const prodNameChange3 = (event) => {
    handleChange(event, setPrice);
    if (event.target.value === "") {
      setBackgroundColor2("red");
      setShadowColor2("red");
      alert("Enter product Price");
    } else {
      setBackgroundColor2("grey");
      setShadowColor2("white");
    }
  };

  const prodTagChange = async (event) => {
    handleChange(event, setTags);

    const inputValue = event.target.value;
    const words = inputValue.split(",");
    const lastWord = await words.map((word) => word.trim()).join(" / ");

    setBoldText(lastWord);

    if (event.target.value === "") {
      setBackgroundColor2("red");
      setShadowColor2("red");
      alert("Enter product tags");
    } else {
      setBackgroundColor2("grey");
      setShadowColor2("white");
    }
  };
  // async function generateButton() {
  //   const app = await client("https://saitejaadapa-saitejaschatbot.hf.space/");
  //   const result = await app.predict("/chat", [
  //     "How many states are there in India?", // string  in 'Message' Textbox component
  //   ]);

  //   console.log(result.data);
  // }
  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
    setImage(result?.info?.secure_url);
  }

  useEffect(() => {
    handleListen();
  }, [isListening]);
  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("Continuee");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        // let final = note;
        console.log("Stopped Mic on click");
      };
    }
    mic.onstart = () => {
      console.log("mic is on");
    };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  const handleStart = () => {
    setIsListening(!isListening);
    if (isListening && note.length > 0) {
      setSavedNotes(note);
    }
  };
  const getAiJSON = (aiResponse) => {
    console.log(aiResponse);
    setJson(aiResponse);
    // setDesc(aiResponse.product_description);
    // setName(aiResponse.product_title);
    // setTags(aiResponse.product_hashtags);
  };

  return (
    <div className="dashboard-header">
      <div>
        <h1 className="head-style1">Create product</h1>
        <p>Add product to your store</p>
      </div>

      <hr className="hr-style" />
      <div className="d-flex flex-row mt-4 bg-container">
        <div className="col-12 col-md-6 mx-2 p-2">
          <div className="d-flex align-items-center justify-content-around">
            <div>
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <div>
                      <button
                        onClick={handleOnClick}
                        className="btn btn-dark text-light cp-button2-style"
                      >
                        Upload an image
                      </button>
                      {/* <button onClick={generateButton}>Generate</button> */}
                    </div>
                  );
                }}
              </UploadWidget>
            </div>
            <div>
              {isListening ? <p>listening</p> : <p>not listening</p>}
              <button
                className="btn btn-outline-dark ms-1"
                onClick={() => handleStart()}
              >
                Start/Stop
              </button>
              <p>{note}</p>
              {/* <Dictaphone /> */}
              <OpenAIChat savedNotes={savedNotes} getAiJSON={getAiJSON} />
            </div>
          </div>

          {error && <p>{error}</p>}
          {url && (
            <>
              <p>
                <img
                  src={url}
                  alt="Uploaded resource"
                  className="uploaded_image"
                />
              </p>
              <p>{url}</p>
            </>
          )}
        </div>
      </div>

      <div className="container-fluid d-flex flex-row ">
        <div className="row bg-container w-100">
          <div className="col-12 col-md-4 p-2">
            <label className="form-label m-0 label-styling" htmlFor="prodName">
              Product name
            </label>
            <input
              style={{
                borderColor: borderColor1,
                boxShadow: `0 0 10px ${shadowColor1}`,
              }}
              type="text"
              multiple
              className="form-control upload-button-style custom-file-input"
              id="prodName"
              value={name}
              onChange={(event) => handleChange(event, setName)}
              onBlur={prodNameChange}
            />
          </div>
          <div className="col-12 col-md-4 p-2">
            <label className="form-label m-0 label-styling" htmlFor="dropdown">
              Category
            </label>
            <div className="dropdown">
              <select
                className="form-select upload-button-style custom-file-input"
                aria-label="Default select example"
                onChange={handleDropdownChange1}
              >
                <option selected disabled>
                  Select category
                </option>
                <option value="textiles">Textiles</option>
                <option value="beauty">Beauty</option>
                <option value="wooden">Wooden</option>
                <option value="jewellery">Jewellery</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-4 p-2">
            <label className="form-label m-0 label-styling" htmlFor="prodDesc">
              Product description {"<200 words"}
            </label>
            <input
              style={{ borderColor, boxShadow: `0 0 10px ${shadowColor}` }}
              type="text"
              multiple
              value={desc}
              className="form-control upload-button-style custom-file-input"
              id="prodDesc"
              onChange={(event) => handleChange(event, setDesc)}
              onBlur={prodName2Change}
            />
          </div>
          <div className="col-12 col-md-4 p-2">
            <label className="form-label m-0 label-styling" htmlFor="prodName">
              Product Price
            </label>
            <input
              style={{
                borderColor: borderColor1,
                boxShadow: `0 0 10px ${shadowColor1}`,
              }}
              type="text"
              multiple
              className="form-control upload-button-style custom-file-input"
              id="prodTags"
              onChange={(event) => handleChange(event, setPrice)}
              onBlur={prodNameChange3}
            />
          </div>

          <div className="col-12 col-md-4 p-2">
            <label className="form-label m-0 label-styling" htmlFor="prodName">
              Tags{" "}
              <span className="tags-p-style">
                ( Enter comma (,) separated tags )
              </span>
            </label>
            <input
              style={{
                borderColor: borderColor1,
                boxShadow: `0 0 10px ${shadowColor1}`,
              }}
              type="text"
              multiple
              value={tags}
              className="form-control upload-button-style custom-file-input"
              id="prodPrice"
              // onChange={(event) => handleChange(event, setTags)}
              onChange={(event) => prodTagChange(event, setName)}
              // onBlur={prodTagChange}
            />
            {boldText && (
              <div>
                <b>{boldText}</b>
              </div>
            )}
          </div>

          {/* <div className="col-12 col-md-4 p-2">
            <label className="form-label m-0 label-styling" htmlFor="dropdown">
              Gender
            </label>
            <div className="dropdown">
              <select
                className="form-select upload-button-style custom-file-input"
                aria-label="Default select example"
                onChange={handleDropdownChange}
              >
                <option selected disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div> */}

          <div className="col-12 col-md-4 p-2 mt-4 d-flex align-items-center text-center justify-content-center archive-style">
            <label className="form-label label-styling" htmlFor="prodArc">
              Archived
            </label>
            <input
              type="checkbox"
              multiple
              className="mx-2 checkboxClass upload-button-style custom-file-input"
              id="prodArc"
              checked={archive}
              onChange={handleCheckboxChange}
            />
            <p className="archive-p-style my-auto">
              Check this box if you do not want to show this product on the
              store.
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-dark text-light border-0 mt-3 mb-3 cp-button-style"
        onClick={updateStateFnCall}
      >
        Create
      </button>
    </div>
  );
};

export default CreateProduct;
