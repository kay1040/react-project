import React from 'react';
import Navbar from '../Navbar/Navbar';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Footer from '../Footer/Footer';

function Layout(props) {
  const { children } = props;
  return (
    <div className="h-screen overflow-auto">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
