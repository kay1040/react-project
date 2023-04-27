import React from 'react';
import ReactDOM from 'react-dom';
import useDisableScroll from '../../hooks/useDisableScroll'

const backdropRoot = document.getElementById('backdrop-root');

export default function Backdrop(props) {
  // 禁止頁面滾動
  useDisableScroll(true);

  return ReactDOM.createPortal(
    <div {...props} className={`fixed inset-0 bg-black/[.3] z-[9999]`} />,
    backdropRoot,
  );
}
