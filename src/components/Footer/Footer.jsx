import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faLine } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="mx-auto bg-darkslategray h-96 text-center flex justify-center items-center top-[100vh] sticky">

            <p className="text-white text-base font-bold">
                since 2016
                <br />
                <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faFacebookF} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faLine} />
            </p>
        </footer>
    )
}

export default Footer;
