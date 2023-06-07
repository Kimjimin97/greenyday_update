import React, { Suspense, lazy } from "react";
import Header from "../components/header";

const Event = lazy(() => import("../codesplit/event"));
const TodayMenu = lazy(() => import("../codesplit/today_menu"));
const Footer = lazy(() => import("../components/footer"));

const NewHome = () => {
  return (
    <div>
      <Header />

      <div class="flex justify-center items-center bg-[#ECE4D7] w-full h-[715px] ">
        <Event />
      </div>

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
