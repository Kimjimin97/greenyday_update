import React, { useState } from "react";

import KakaoSignup from "./kakaosignup";
import Header from "../../components/header";
import Footer from "../../components/footer";

const Kakaoextra = () => {
  return (
    <div class="bg-[#ECE4D7] overflow-x-hidden">
      <Header></Header>
      <div class=" flex flex-col items-center ">
        <h1 class=" text-[50px] mt-[40px] mb-[20px]">Sign up</h1>
        <p class="text-[#797878] text-[20px] mb-[30px]">
          샐러드를 주문하려면 추가 정보가 필요해요!
        </p>
        <div class="w-[400px]  lg:w-[600px]  p-[55px] rounded-[60px]">
          <KakaoSignup></KakaoSignup>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Kakaoextra;
