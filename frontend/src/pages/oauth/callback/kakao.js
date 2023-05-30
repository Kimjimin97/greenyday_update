import { useEffect, useState } from "react";
import axios from "axios";
import { backUrl } from "../../../config/config";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { LOGIN_IN_SUCCESS } from "../../../reducers/user";

let mountCount = 1;
const Kakao = () => {
  const dispatch = useDispatch();
  const [code, setcode] = useState("");
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setcode(new URL(window.location.href).searchParams.get("code"));
  }, []);

  if (code && !didMount) {
    mountCount++;
    setDidMount(true);

    axios
      .get(`${backUrl}/api/accounts/login/kakao/?code=${code}`, {
        params: {
          code: code,
        },
      })
      .then((res) => {
        if ("access_token" in res.data) {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          dispatch({ type: LOGIN_IN_SUCCESS });
          return Router.push("/home");
        }

        localStorage.setItem("email", res.data.email);
        localStorage.setItem("nickname", res.data.nickname);
        return Router.push("/loginpage/kakaoextra");
      })
      .catch((err) => console.error(err.response));
  }
};

export default Kakao;
