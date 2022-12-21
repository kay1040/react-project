import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout(props) {
  const { children } = props;
  return (
    <div className="h-screen">
      <Navbar />
      <main className="mt-28">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
