import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout(props) {
  const { children } = props;

  const [isScroll, setIsScroll] = useState(true);
  useEffect(() => {
    if (isScroll) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }, [isScroll]);

  return (
    <div className="h-screen">
      <Navbar onScroll={(show) => { setIsScroll(!show); }} />
      <main className="mt-28">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
