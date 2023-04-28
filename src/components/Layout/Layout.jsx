import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout(props) {
  const { children } = props;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[70px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
