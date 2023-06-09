import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { backUrl, frontUrl } from "../config/config";
import { LOG_OUT_REQUEST } from "../reducers/user";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOG_OUT_REQUEST });
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    console.log("access", access_token);
    console.log("refresh", refresh_token);
    axios
      .post(
        backUrl + "/api/accounts/logout/",
        { refresh_token: refresh_token },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(function (response) {
        Router.push("/home");
        window.localStorage.clear();
      })
      .catch(function (error) {
        Router.push("/home");
        window.localStorage.clear();
        console.log(error);
      });
  });

  return;
};

export default Logout;
