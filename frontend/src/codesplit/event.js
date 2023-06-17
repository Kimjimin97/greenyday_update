import { Carousel } from "@mantine/carousel";
import { Image } from "next/image";
import axios from "axios";
import { backUrl } from "../config/config";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Event({ data }) {
  console.log("data", data);
  const dispatch = useDispatch();
  const [images, setimgurl] = useState([]);
  const [mainPosts, setmenu] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    axios.get("/api/main/").then((res) => {
      const events = res.data.events;
      const image = [];

      events.map((url) => {
        image.push(url.image);
      });
      setimgurl(image);
      setmenu(res.data.items);
    });
  }, []);

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

  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} width={1200} height={675} priority={true} />
    </Carousel.Slide>
  ));

  const slide = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} width={375} height={211} priority={true} />
    </Carousel.Slide>
  ));

  return (
    <div>
      {isMobile ? (
        <div class="bg-[#ECE4D7] overflow-x-hidden">
          <div>
            <div class="">
              <div class="mt-10 ">
                <Carousel
                  controlSize={72}
                  // sx={{ maxWidth: 768 }}
                  mx="auto"
                  withIndicators={true}
                >
                  {slide}
                </Carousel>
                {/* 모바일입니다. */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="bg-[#ECE4D7] overflow-x-hidden">
          <div>
            <div class="">
              <div class="mt-10 ">
                <Carousel
                  controlSize={72}
                  sx={{ maxWidth: 1200 }}
                  mx="auto"
                  withIndicators={true}
                >
                  {slides}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
