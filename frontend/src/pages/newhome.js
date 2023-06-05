import React, {Suspense, lazy} from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Event from "../codesplit/event"

const TodayMenu = React.lazy(() => import("../codesplit/today_menu"));

const NewHome = () => {
    return (
      <div>
        <Header />
        <Event />
        <Suspense fallback = {<div>loading..</div>}>
            <TodayMenu />
        </Suspense>
        <Footer />
      </div>
    );
  };
  
  export default NewHome;