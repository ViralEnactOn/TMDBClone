/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../store/store";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username.length === 0) {
      setUsernameError("Username cannot empty.");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length === 0) {
      setPasswordError("Password cannot empty.");
      return;
    } else {
      setPasswordError("");
    }
    // setDisableButton(true);
    axios
      .post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setDisableButton(false);
        if (res.status === 200) {
          console.log(res.data);
          // Calculate token expiration time (60 minutes from now in milliseconds)
          const expirationTime = new Date().getTime() + 60 * 60 * 1000;

          // Store the authentication token and its expiration time in localStorage
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("authTokenExpiration", expirationTime);
          store.dispatch({ type: "UPDATE_USERDETAILS", payload: [res.data] });
          navigate("/movie");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleCheckUser = () => {
    const authToken = localStorage.getItem("authToken");
    const authTokenExpiration = localStorage.getItem("authTokenExpiration");
    const isLoggedIn =
      authToken !== null && new Date().getTime() < authTokenExpiration;
    setIsLogged(isLoggedIn);
    if (isLoggedIn === true) {
      navigate("/movie");
    }
  };

  useEffect(() => {
    handleCheckUser();
  }, []);

  return (
    <>
      <main className="min-w-max flex justify-center font-poppins bg-blue-200">
        <div className="container">
          <div className="flex justify-center min-h-screen">
            <div className="flex self-center w-96 h-96 bg-gray-200 justify-center rounded-lg">
              <div className="self-center ">
                <div className="flex justify-center font-bold text-xl">
                  Login
                </div>
                <div className="mt-10">Username</div>
                <div className="mt-1">
                  <input
                    type="text"
                    className="rounded-lg p-3"
                    placeholder="Enter username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  {usernameError && (
                    <div className="text-red-700">{usernameError}</div>
                  )}
                </div>
                <div className="mt-5">Password</div>
                <div className="mt-1">
                  <input
                    type="password"
                    className="rounded-lg p-3"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {passwordError && (
                    <div className="text-red-700">{passwordError}</div>
                  )}
                </div>
                <div
                  className="mt-5 flex justify-center rounded-lg bg-cyan-300 p-2 "
                  onClick={() => handleSubmit()}
                >
                  <button type="submit" disabled={disableButton === true}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default login;
