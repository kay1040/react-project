import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-screen-xl mx-auto text-center flex flex-col justify-between h-full">
      <div>
        <h2 className="font-bold text-darkslategray mt-12 md:mt-20">關於我們</h2>
        <p className="text-base mt-8 leading-loose px-12 ">
          一畝花田為國立高雄應用科技大學文化創意產業系的一組畢製團隊
          <br />
          我們致力於推廣纏花這項快要失傳的傳統工藝，讓更多人能夠認識纏花
        </p>
      </div>
      <img src="/images/about_img.png" className="mt-6 w-screen" alt="leaf" />
    </div>
  );
}
