import React from 'react';

function Intro() {
  return (
    <div className="max-w-screen-xl mx-auto my-8 md:my-16 text-left">
      <div className="mx-8 md:mx-32">
        <h2>纏花的由來</h2>
        <div>
          <p className="text-base mt-4 leading-loose">
            纏花（又稱春仔花），是台灣的傳統工藝之一，常用於婚嫁迎娶，早期新娘出嫁時，都會佩戴雙石榴造型的纏花。
            但隨著時代的變遷，工業的興起，新娘髮飾日漸翻新，這種純手工的纏花也漸漸被製成時間短的緞布花所取代，而逐漸沒落。
          </p>
          <p className="text-base mt-4 leading-loose">
            目前纏花主要分為「閩南纏花」與「客家纏花」兩種，閩南纏花大都指的是鹿港地區的款式及北部款式，
            而客家纏花指的是台灣北部客家族群所製作的款式，因為地域性的不同，各地的纏花款式都不太一樣。
            另外在金門也有纏花，當地人稱為「吉花」。
          </p>
        </div>
        <div>
          <img src="/flower-field/imgs/info.jpg" className="w-screen" alt="纏花傳統款插圖" />
        </div>
        <div>
          <h2>不同地區的纏花</h2>
          <h3 className="mt-6">閩南－春仔花</h3>
          <p className="text-base mt-4 leading-loose">
            閩南人稱纏花為「春仔花」，「春」在閩南語發音是「剩」音有年年有餘的意思
            。因此只要在婚嫁喜慶的場合或喜事上，都會佩戴春仔花，用色只有單一的紅色，
            較常見的花款有龜（代表長壽）、百合花（代表百年好合）、鹿（代表祿）、石榴等基本樣式。
          </p>
          <h3 className="mt-6">客家－纏花</h3>
          <p className="text-base mt-4 leading-loose">
            客家纏花是北部地區的客家人特有的手工技藝，強調華麗的裝飾性，因此造型琳瑯滿目，
            顏色多變，應用的層面也比春仔花廣，雖然大多用在婚嫁喜慶上，但也用於宗教祭典上，
            像是祭典用的供花，或是平常用的童帽裝飾等。
          </p>
          <h3 className="mt-6">金門－吉花</h3>
          <p className="text-base mt-4 leading-loose">
            金門地區將纏花稱為「吉花」，因為金門人喜歡栽種「吉仔」，
            也就是石榴，象徵吉利，因此將纏花稱為吉花，吉花有分大吉跟小吉，
            一般大吉比較少人使用，而小吉使用最為普遍，用在婚嫁、喜慶、喪事，
            因此許多人說的吉花都是指小吉。
          </p>
        </div>
      </div>
    </div>
  );
}

export default Intro;
