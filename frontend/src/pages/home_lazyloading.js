import React, { Suspense, lazy } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Events from "../codesplit/event";
// import TodayMenu from "../codesplit/today_menu";

const TodayMenu = React.lazy(() => import("../codesplit/today_menu"));

const NewHome = () => {
  return (
    <div>
      <Header />
      <Events />
      <Suspense fallback={<div>loading..</div>}>
        <TodayMenu />
      </Suspense>
      <Footer />
    </div>
  );
};

export default NewHome;
