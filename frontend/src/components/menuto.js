import { backUrl } from "../config/config";
import Link from "next/link";
function cutString(str, maxLength) {
  str += " ";
  let cutStr = str.substring(0, maxLength);
  let lastIndex = cutStr.lastIndexOf(" ");
  cutStr = cutStr.substring(0, lastIndex);
  return cutStr;
}

const MenuTo = ({ menus }) => {
  const imgurl = menus.image[0];
  const category = menus.category;

  return (
    <div class="flex flex-col place-items-center  max-w-[260px] h-[400px] rounded-[40px] shadow bg-[#CEC0AC] px-3">
      <Link href={"/menu/" + category}>
        <img
          class=" display:block object-scale-down hover:scale-105 "
          src={backUrl + imgurl}
        ></img>
      </Link>
      <div class="display:block  text-[#FEF5E9] text-[25px] mb-[10px]">
        {menus.name}
      </div>

      <p class=" display:block  mx-3  text-center overflow-ellipsis overflow-hidden ">
        {/* {menus.description} */}
        {cutString(menus.description, 50) + "..."}
      </p>
    </div>
  );
};

export default MenuTo;
