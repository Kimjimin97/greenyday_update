import Header from "../../components/header";
import Menucompoleft from "../../components/menuleft";
import Menucomporight from "../../components/menuright";
import Footer from "../../components/footer";
import { backUrl } from "../../config/config";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/router";

function Menu() {
  const [menu, setMenu] = useState([]);
  const router = useRouter();
  const category = router.query.id;

  useEffect(() => {
    axios
      .get(backUrl + "/api/items/?category_id__name=" + category)
      .then((res) => {
        setMenu(res.data);
      });
  }, [category]);

  return (
    <div class="bg-[#ECE4D7]">
      <Header />
      <div class="mt-7">
        <div class=" ">
          <div class="flex flex-col items-center my-20">
            {menu.map((m, index) => {
              if (index % 2 == 0) {
                return (
                  <div>
                    {" "}
                    <Menucompoleft menu={m}></Menucompoleft>
                  </div>
                );
              } else {
                return (
                  <div>
                    <Menucomporight menu={m}></Menucomporight>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
