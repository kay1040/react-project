import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const backdropRoot = document.getElementById('backdrop-root');

export default function Backdrop(props) {
  // 禁止頁面滾動
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => document.body.style.overflowY = 'auto';
  }, []);
  return ReactDOM.createPortal(
    <div {...props} className={`fixed inset-0 bg-black/[.3] z-[9999]`} />,
    backdropRoot,
  );
}
