import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const Layout = (props) => {
    return (
        <div className="h-screen overflow-auto">
            <Navbar/>
            <main>{props.children}</main>
            <Footer/>
        </div>
    );
};

export default Layout;