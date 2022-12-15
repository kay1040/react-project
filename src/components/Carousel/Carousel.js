import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Carousel.css";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination,  Scrollbar } from "swiper";

const carouselImgs = [
    '/flower-field/imgs/carousel/01.png',
    '/flower-field/imgs/carousel/02.png',
    '/flower-field/imgs/carousel/03.png',
    '/flower-field/imgs/carousel/04.png'
];


export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        scrollbar={{
          hide: true,
        }}
        effect={"fade"}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination,  Scrollbar]}
        className="mySwiper"
      >
        {carouselImgs.map(src => {
          return   <SwiperSlide key={src}><img src={src}/></SwiperSlide>
        })}
      </Swiper>
    </>
  );
}
