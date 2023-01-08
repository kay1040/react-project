import React, { useState } from 'react';

function Carousel() {
  const controler = {
    current: 0,
    
  }
  
  // 參考:https://cloud.tencent.com/developer/article/2134761

  const carouselImgs = [
    '/flower-field/imgs/carousel/01.png',
    '/flower-field/imgs/carousel/02.png',
    '/flower-field/imgs/carousel/03.png',
    '/flower-field/imgs/carousel/04.png',
  ];

  return (
    <div>
      <div className="outer">
        <div className="img-divst">
          <div className="current">
            <img src="/flower-field/imgs/carousel/01.png" alt="輪播圖" />
          </div>
          {carouselImgs.map((src, index) => <div key={src}><img src={src} alt="carousel" /></div>)}
        </div>
        <div className="prev-next">
          <button type="button" id="prev">〈</button>
          <button type="button" id="next">〉</button>
        </div>
        <div className="dot">
          <button type="button" className="active" />
          <button type="button" />
          <button type="button" />
          <button type="button" />
          <button type="button" />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
