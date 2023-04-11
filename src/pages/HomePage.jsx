import React from 'react';
import Carousel from '../components/Home/Carousel';
import NewProducts from '../components/Home/NewProducts';
import Traditions from '../components/Home/Traditions';

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <NewProducts />
      <Traditions />
    </div>
  );
}
