import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout(props) {
  const { children } = props;

  // 設定是否禁止滾動
  const [isScroll, setIsScroll] = useState(true);
  useEffect(() => {
    if (isScroll) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }, [isScroll]);

  return (
    <>
      <Navbar onScroll={(show) => { setIsScroll(!show); }} />
      <main style={{ minHeight: '100%' }}>
        <div className="pt-[70px] pb-[210px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
