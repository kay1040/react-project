import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';
import {
  Autoplay, EffectFade, Navigation, Pagination, Scrollbar,
} from 'swiper';

const carouselImgs = [
  '/imgs/carousel/01.jpg',
  '/imgs/carousel/02.jpg',
  '/imgs/carousel/03.jpg',
  '/imgs/carousel/04.jpg',
  '/imgs/carousel/05.jpg',
];

export default function Carousel() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      scrollbar={{
        hide: true,
      }}
      effect="fade"
      navigation={false}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, EffectFade, Navigation, Pagination, Scrollbar]}
      className="mySwiper"
    >
      {carouselImgs.map((src) => <SwiperSlide key={src}><img src={src} alt="carousel" /></SwiperSlide>)}
    </Swiper>
  );
}
