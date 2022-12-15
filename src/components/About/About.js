import React from 'react';

const About = () => {
    return (
        <div className="max-w-screen-xl mx-auto mt-16 md:mt-24 text-center ">
            <h2 className="font-bold text-darkslategray">關於我們</h2>
            <p className="text-base mt-8 leading-loose px-12 ">
                一畝花田為國立高雄應用科技大學文化創意產業系的一組畢製團隊
            </p>
            <p className="text-base mt-2 leading-loose px-12 ">
                我們致力於推廣纏花這項快要失傳的傳統工藝，讓更多人能夠認識纏花
            </p>
            <img src="/imgs/about_img.png" className="mt-8 w-screen" />
        </div>
    );
};

export default About;