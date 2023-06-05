import React, { Suspense } from "react";
import Header from "../../components/header";
import Menucompoleft from "../../components/menuleft";
import Menucomporight from "../../components/menuright";
import Footer from "../../components/footer";
import { backUrl } from "../../config/config";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/router";

// const loadComponent = (isLeft) => {
//   if (isLeft) {
//     return import('../../components/menuleft');
//   } else {
//     return import('../../components/menurith');
//   }
// };

function LazyLoadComponent() {
  const [menu, setMenu] = useState([]);
  const router = useRouter();
  const category = router.query.id;
  const visibleCount = 4;
  const [loadedCount, setLoadedCount] = useState(visibleCount);

  useEffect(() => {
    axios
      .get(backUrl + "/api/items/?category_id__name=" + category)
      .then((res) => {
        setMenu(res.data);
      });
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        // 페이지 하단에 도달하면 추가 콘텐츠를 로드합니다.
        setLoadedCount((prevCount) =>
          Math.min(prevCount + visibleCount, menu.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menu.length, visibleCount]);

  const renderMenuComponents = () => {
    const menuComponents = [];

    for (let i = 0; i < loadedCount; i++) {
      if (i < menu.length) {
        const menuData = menu[i];
        const Component = i % 2 === 0 ? Menucompoleft : Menucomporight;
        menuComponents.push(
          <div key={i}>
            <Component menu={menuData}></Component>
          </div>
        );
      }
    }

    return menuComponents;
  };

  return (
    <div class="bg-[#ECE4D7]">
      <Header />
      <div class="mt-7">
        <div className="flex flex-col items-center my-20">
          {renderMenuComponents()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LazyLoadComponent;

//   return (
//     <div class="bg-[#ECE4D7]">
//       <Header />
//       <div class="mt-7">
//         <div class=" ">
// {/*
//           <div className="flex flex-col items-center my-20">
//         {menu.map((m, index) => {
//           const isLeft = index % 2 === 0;
//           const LazyComponent = React.lazy(() => loadComponent(isLeft));

//           return (
//             <Suspense key={index} fallback={<div>Loading...</div>}>
//               <div>
//                 <LazyComponent menu={m} />
//               </div>
//             </Suspense>
//           );
//         })}
//       </div> */}
//           <div class="flex flex-col items-center my-20">
//             {menu.map((m, index) => {
//               if (index % 2 == 0) {
//                 return (
//                   <div>
//                     {" "}
//                     <Menucompoleft menu={m}></Menucompoleft>
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div>
//                     <Menucomporight menu={m}></Menucomporight>
//                   </div>
//                 );
//               }
//             })}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Menu;
