import React from 'react';

export default function Message({ message }) {
  return (
    <div
      className="bg-[#599b9b] shadow-md p-2 fixed
      top-[70px] left-0 z-[9999] w-screen h-[40px] text-center"
    >
      <span className="text-white font-bold">{message}</span>
    </div>
  );
}
