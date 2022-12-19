import React from 'react';
import Carousel from '../components/Carousel/Carousel';
import NewProducts from '../components/NewProducts/NewProducts';
import Traditions from '../components/Traditions/Traditions';

function HomePage() {
  return (
    <div>
      <Carousel />
      <NewProducts />
      <Traditions />
    </div>
  );
}

export default HomePage;
