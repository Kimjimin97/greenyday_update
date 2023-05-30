import { Menu } from "antd";
import LOGIN from "../loginpage/login";
import SIGNUP from "../loginpage/signup";

import axios from "axios";
import { backUrl } from "../../config/config";
import { useEffect, useState } from "react";

function MenuHeader() {
  return (
    <header class=" bg-[#ECE4D7]">
      <nav class="flex flex-col place-items-center">
        {/* 맨 위 헤더 */}
        <div
          class="w-4/6  my-12 flex 
        justify-between place-items-center"
        >
          <a href="https://www.instagram.com/greenyday_anseo/">
            <img class="hidden md:block md:h-10" src="/instagram.png" />
          </a>

          <img class="w-140 h-12 pl-20" src="/LOGO.png" />

          {/* <img class="w-10 h-10" src={backUrl + imgurl} /> */}

          <ul class="hidden md:block md:flex font-[300] text-[23px]">
            <li class="mr-8">
              <a href="/loginpage/login">Login</a>
            </li>
            <li>
              <a href="/loginpage/signup">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MenuHeader;
