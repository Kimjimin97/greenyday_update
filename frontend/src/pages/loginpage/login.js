import React, { useState } from "react";

import LoginComponent from "../../components/logincomponent";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";

const Login = () => {
  var { logInFail } = useSelector((state) => state.user);

  return (
    <div>
      <Header></Header>
      <div>
        {" "}
        {logInFail ? (
          <div>
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">로그인 실패 : </strong>
              <span class="block sm:inline">
                아이디와 비밀번호를 확인해 주세요.
              </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        <div class="flex items-center justify-center bg-[#ECE4D7] h-[700px]">
          <div class="lg:bg-[#FEF5E9] w-full  ">
            <div class="lg:flex lg:justify-between lg:items-center grid place-items-center">
              <div class="hidden lg:block w-[60px] h-[600px] bg-[#245A3A]"></div>
              <div class="hidden lg:block">
                <img src="/LOGO.png"></img>
              </div>
              <div class="lg:mr-[150px] lg:w-[550px] w-[400px] ">
                <LoginComponent></LoginComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Login;
