import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import axios from "axios";
import { backUrl } from "../config/config";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const [images, setimgurl] = useState([]);
  const [mainPosts, setmenu] = useState([]);

  useEffect(() => {
    axios.get(backUrl + "/api/main/").then((res) => {
      const events = res.data.events;
      const image = [];

      events.map((url) => {
        console.log(backUrl + url.image);
        image.push(backUrl + url.image);
      });
      setimgurl(image);
      setmenu(res.data.items);
    });
  }, []);

  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} width={1200} height={675} priority={true} />
    </Carousel.Slide>
  ));
  return (
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
  );
}

export default Home;
