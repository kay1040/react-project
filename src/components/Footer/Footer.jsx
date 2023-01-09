import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF, faInstagram, faLine, faTwitter, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="bg-darkslategray h-[210px] flex justify-center items-center mt-[-210px]">
      <div className="text-white text-base font-bold text-center">
        <div className="font-mono text-basic mb:text-large">聯絡我們</div>
        <div className="text-xl md:text-2xl mt-3">
          <a href="mailto:info@chanhuatian.com.tw" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="https://www.youtube.com/channel/UCb160bphD2_cRkntcMHVwcQ" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.facebook.com/ChanHuaTian/" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com/" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com/" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://line.me/zh-hant/" className="mx-2 hover:text-zinc-300">
            <FontAwesomeIcon icon={faLine} />
          </a>
        </div>
        <div className="mt-5 font-mono text-sm">一畝花田 since 2016</div>
      </div>
    </footer>
  );
}

export default Footer;
