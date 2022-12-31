import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="mx-auto bg-darkslategray h-72 md:h-48 flex justify-center items-center top-[100vh] sticky">
      <div className="text-white text-base font-bold text-center">
        <div className="my-6">一畝花田 since 2016</div>
        <div className="text-2xl">
          <a href="mailto:info@ChanHuaTian.com.tw" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="https://www.youtube.com/channel/UCb160bphD2_cRkntcMHVwcQ" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.facebook.com/ChanHuaTian/" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
