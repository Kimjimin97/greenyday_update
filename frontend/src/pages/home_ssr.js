import Header from "../components/header";
import Footer from "../components/footer";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import axios from "axios";
import { backUrl } from "../config/config";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import MenuTo from "../components/menuto";

const DynamicHome = () => {
  const dispatch = useDispatch();
  // const [images, setimgurl] = useState([]);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backUrl + "/api/main/");
        const data = response.data;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const mainPosts = data.items;
  const events = data.events;

  const images = events.map((url) => url.image);

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
    <div className="bg-[#ECE4D7] overflow-x-hidden">
      <div>
        <div className="">
          <Header className="z-50" />
        </div>

        <div className="">
          <div className="mt-10 ">
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
      <div className="flex flex-col place-items-center mt-10 ">
        <div className="w-[1200px] text-[30px] font-semibold mb-10 text-center lg:text-left">
          Today's Menuu
        </div>
        <div className="grid gap-14 lg:grid-cols-4 lg:grid-rows-1 md:grid-rows-2 md:grid-cols-2 grid-rows-4 grid-cols-1">
          {mainPosts.map((m, index) => (
            <MenuTo menus={m} key={index} />
          ))}
        </div>

        {/* ... */}
      </div>
      <Footer />
    </div>
  );
};

export default DynamicHome;
