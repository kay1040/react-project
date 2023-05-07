import React from 'react';
import ReactDOM from 'react-dom';
// import useDisableScroll from '../../hooks/useDisableScroll'
import { ScrollLocky } from 'react-scroll-locky';

const backdropRoot = document.getElementById('backdrop-root');

export default function Backdrop(props) {
  // 禁止頁面滾動
  // useDisableScroll(true);

  return ReactDOM.createPortal(
    <ScrollLocky><div {...props} className={`mask fixed inset-0 bg-black/[.3] z-[9999]`} /></ScrollLocky>,
    backdropRoot,
  );
}
