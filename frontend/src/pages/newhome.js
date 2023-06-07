import React, { Suspense, lazy } from "react";
import Header from "../components/header";
import { useState, useEffect } from "react";

const Event = lazy(() => import("../codesplit/event"));
const TodayMenu = lazy(() => import("../codesplit/today_menu"));
const Footer = lazy(() => import("../components/footer"));

const NewHome = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth < 768; // 모바일 기기의 너비를 768px로 설정
      setIsMobile(isMobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  return (
    <div>
      <Header />
      {isMobile ? (
        <div class="flex justify-center items-center bg-[#ECE4D7] w-full h-[400px] ">
          <Event />
        </div>
      ) : (
        <div>
          {" "}
          <div class="flex justify-center items-center bg-[#ECE4D7] w-full h-[715px] ">
            <Event />
          </div>
        </div>
      )}

      <Suspense fallback={<div>Loading Today Menu...</div>}>
        <TodayMenu />
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default NewHome;
