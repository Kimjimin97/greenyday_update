import React, { useState } from "react";

import SignupComponent from "./signupcomponent";
import Header from "../../components/header";
import Footer from "../../components/footer";

const Signup = () => {
  return (
    <div class="bg-[#ECE4D7] overflow-x-hidden">
      <Header></Header>
      <div class=" flex flex-col items-center ">
        <h1 class=" text-[50px] mt-[40px] mb-[20px]">Sign up</h1>
        <p class="text-[#797878] text-[20px] mb-[30px]">
          샐러드를 주문하려면 회원가입이 필요해요!
        </p>
        <div class="w-[400px]  lg:w-[600px]  p-[55px] rounded-[60px]">
          <SignupComponent></SignupComponent>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Signup;
