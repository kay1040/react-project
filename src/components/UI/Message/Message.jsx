import React from 'react';

function Message(props) {
  const { message } = props;
  return (
    <div
      className="bg-[#599b9b] border rounded shadow-md p-2 fixed
      top-[240px] left-1/2 z-[9999] w-[300px] ml-[-150px] h-[40px] text-center"
    >
      <span className="text-white font-bold">{message}</span>
    </div>
  );
}

export default Message;
