import React from 'react';

function Message(props) {
  const { message } = props;
  return (
    <div
      className="bg-[#599b9b] shadow-md p-2 fixed
      top-[70px] left-0 z-[9999] w-screen h-[40px] text-center"
    >
      <span className="text-white font-bold">{message}</span>
    </div>
  );
}

export default Message;
