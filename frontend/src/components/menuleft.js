import { backUrl } from "../config/config";

function cutString(str, maxLength) {
  let cutStr = str.substring(0, maxLength);
  let lastIndex = cutStr.lastIndexOf(" ");
  cutStr = cutStr.substring(0, lastIndex);
  var remainingStr = str.substr(lastIndex, str.length);
  return [cutStr, remainingStr];
}

const MenuLeft = ({ menu }) => {
  const [a, b] = cutString(menu.description, 20);

  return (
    <div class=" lg:w-[80rem] lg:h-[15rem]  bg-[#ECE4D7] mb-6 h-[40rem]">
      <div class=" h-64 flex lg:flex-row flex-col items-center ">
        <img class="w-auto hidden lg:block" src="/greenline.png"></img>
        <div class="lg:hidden border-[1px] border-[#245A3A] w-full"></div>
        <img class="w-auto h-[20rem] " src={backUrl+menu.itemimges[0].photo}></img>
        <div>
          <div class="lg:grid lg:justify-items flex flex-col items-center ">
            <div class=" mb-2 text-[#245A3A] font-bold text-[28px] ">
              {menu.name}
            </div>
            <p class=" lg:text-left  mb-2  text-[20px] text-center">
              {menu.description.length <= 50 ? (
                <div> {menu.description}</div>
              ) : (
                <div>
                  <div> {a}</div>
                  <div>{b}</div>
                </div>
              )}
            </p>
            <div class=" lg:text-left  mb-3  text-[17px] text-center">
              <div>{menu.ingredients.description}</div>
            </div>

            <div class="flex  items-center font-semibold text-[20px]">
              <div class="mr-4">
                <div>칼로리</div>
                <div>{menu.calorie}kcal</div>
              </div>
              <div class=" mr-4 flex flex-col items-center">
                <div>탄수화물</div>
                <div>{menu.nutritions.carbohydrate}</div>
              </div>
              <div class=" mr-4 flex flex-col items-center">
                <div>단백질</div>
                <div>{menu.nutritions.protein}</div>
              </div>
              <div class=" flex flex-col items-center">
                <div>지방</div>
                <div>{menu.nutritions.fat}</div>
              </div>
            </div>
          </div>
        </div>
        {/* 정보 */}
      </div>
    </div>
  );
};

export default MenuLeft;
