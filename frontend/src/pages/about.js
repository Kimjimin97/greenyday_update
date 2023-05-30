import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
function cutString(str, maxLength) {
  let cutStr = str.substring(0, maxLength);
  let lastIndex = cutStr.lastIndexOf(" ");
  cutStr = cutStr.substring(0, lastIndex);
  var remainingStr = str.substr(lastIndex, str.length);
  return [cutStr, remainingStr];
}
function About() {
  const str1 =
    "매일 아침 신선한 식재료로 만든 샐러드와 든든한 한 끼 도시락 취향에 맞는 토핑으로 나만의 식단을 만들어 보세요.";
  const str2 = "한 입에 즐기는 다양한 식감, 간편하지만 건강한 한 끼를 즐기세요";
  const str3 =
    "60시간 이상 정성으로 만들어 산미는 낮추고 꾸덕함은 올렸습니다. 365일 1등급 프리미엄+원유를 사용합니다. 복함 유산균 뿐만 아니라 프로바이오틱스까지, 장내에 유익한 유산균 수를 극대화 하였습니다.";

  const [str1_a, str1_b] = cutString(str1, 30);
  const [str2_a, str2_b] = cutString(str1, 30);
  const [str3_a, str3_b] = cutString(str1, 30);

  return (
    <div class="bg-[#ECE4D7]">
      <Header></Header>
      <div class="w-full h-[70px] lg:hidden bg-[#ECE4D7]"></div>
      <div class="">
        <img
          class=" opacity-75 relative w-full lg:h-[700px] h-[300px] "
          src="/about_img.jpg"
        ></img>
        <div class="flex flex-col place-items-center">
          <div class="absolute text-[30px] tracking-wide lg:top-[820px] mb-[40px] lg:text-[90px] text-[#245A3A] font-bold items-center ">
            ABOUT GRENNYDAY
          </div>
          <div>
            <p class="text-center   lg:text-[30px] leading-loose my-[100px] ">
              그리니데이는 당신의 하루에 건강함을 채워 줄 샐러드 전문
              브랜드입니다. <br /> 신선하고 깨끗한 식재료 사용을 원칙으로,
              건강한 음식을 제공하고 있습니다. <br /> 지속가능한 라이프스타일을
              위해, 가볍고 건강한 일상을 위해, <br /> 당신의 오늘을 건강하게
              채워줄, 든든한 하루 Have a GRENNYDAY
            </p>
          </div>
        </div>
      </div>
      {/* 그리니데이메뉴 */}
      <div class="flex flex-col place-items-center">
        <div class="text-[30px] lg:text-[90px] tracking-wide text-[#245A3A] font-bold items-center">
          GREENYDAY MENU
        </div>
      </div>
      {/* 메뉴 컴포넌트 시작*/}
      <div class=" grid bg-[#FEF5E9]  mt-20">
        <div class=" w-[60px] h-full bg-[#245A3A]"></div>
        <div class="col-start-2 col-span-4">
          <div class="flex flex-col lg:flex-row items-center ">
            <img class="lg:mx-20 w-auto h-[20rem] " src="/main1.png"></img>
            <div class="flex flex-col items-center lg:flex lg:items-start ">
              <div class="  mb-7 text-[#245A3A] font-bold text-[28px]">
                샐러드 & 도시락
              </div>
              <div class=" lg:mb-4 lg:w-auto text-[20px] hidden lg:block">
                매일 아침 신선한 식재료로 만든 샐러드와 든든한 한 끼 도시락
                취향에 맞는 토핑으로 나만의 식단을 만들어 보세요.
              </div>
              <div class=" mb-10 lg:mb-0 font-black text-[22px] ">
                <Link href={"/menu/" + "샐러드"}>
                  <div class="hover:text-[#6E7E5D]">샐러드 보러가기</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 메뉴 컴포넌트 끝*/}
      <div class=" grid bg-[#FEF5E9]  mt-20">
        <div class=" w-[60px] h-full bg-[#245A3A]"></div>
        <div class="col-start-2 col-span-4">
          <div class="flex flex-col lg:flex-row items-center ">
            <img class="lg:mx-20 w-auto h-[20rem] " src="/main2.png"></img>
            <div class="flex flex-col items-center lg:flex lg:items-start ">
              <div class="  mb-7 text-[#245A3A] font-bold text-[28px]">
                샌드위치 & 랩
              </div>
              <div class=" lg:mb-4 lg:w-[740px] text-[20px] hidden lg:block">
                한 입에 즐기는 다양한 식감, 간편하지만 건강한 한 끼를 즐기세요.
              </div>
              <div class=" mb-10 lg:mb-0 font-black text-[22px] ">
                <Link href={"/menu/" + "샌드위치"}>
                  <div class="hover:text-[#6E7E5D]">샌드위치 보러가기</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메뉴 컴포넌트 시작 */}

      {/* 메뉴 컴포넌트 끝 */}

      <div class=" grid bg-[#FEF5E9] my-20">
        <div class="col-start-1 w-[60px] h-full bg-[#245A3A]"></div>
        <div class="col-start-2 col-span-4">
          <div class="flex flex-col lg:flex-row items-center ">
            <img class="lg:mx-20 w-auto h-[20rem] " src="/main3.png"></img>
            <div class="flex flex-col items-center lg:flex lg:items-start ">
              <div class=" lg:mb-7 text-[#245A3A] font-bold text-[28px]">
                그릭요거트
              </div>
              <div class=" sm:mb-4 lg:w-auto text-[20px] hidden lg:block">
                60시간 이상 정성으로 만들어 산미는 낮추고 꾸덕함은 올렸습니다.
                365일 1등급 프리미엄+원유를 사용합니다. <br />
                복함 유산균 뿐만 아니라 프로바이오틱스까지, 장내에 유익한 유산균
                수를 극대화 하였습니다.
              </div>
              <div class=" mb-10 lg:mb-0 font-black text-[22px] ">
                <Link href={"/menu/" + "그릭요거트"}>
                  <div class="hover:text-[#6E7E5D]">그릭요거트 보러가기</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
