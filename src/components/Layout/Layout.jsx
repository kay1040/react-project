import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout(props) {
  const { children } = props;

  // 設定購物車預覽開啟時禁止頁面滾動
  const [isScroll, setIsScroll] = useState(true);
  useEffect(() => {
    // useLayoutEffect(() => {
    if (isScroll) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
    // return () => {
    //   document.body.style.overflowY = 'auto';
    // };
  }, [isScroll]);

  return (
    <>
      <Navbar onScroll={(show) => { setIsScroll(!show); }} />
      <main className="flex-grow ">
        <div className="pt-[70px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}
