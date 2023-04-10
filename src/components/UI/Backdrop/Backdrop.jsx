import React from 'react';
import ReactDOM from 'react-dom';

const backdropRoot = document.getElementById('backdrop-root');

export default function Backdrop(props) {
  return ReactDOM.createPortal(
    <div {...props} className={`fixed inset-0 bg-black/[.3] z-[9999] ${props.className}`} />,
    backdropRoot,
  );
}
