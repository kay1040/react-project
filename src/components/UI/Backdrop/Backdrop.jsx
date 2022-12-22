import React from 'react';
import ReactDOM from 'react-dom';

const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = (props) => {
  return ReactDOM.createPortal(<div {...props} className={`fixed inset-0 bg-black/[.3] z-[9999] ${props.className}`}>
      {props.children}
  </div>, backdropRoot);
};

export default Backdrop;
