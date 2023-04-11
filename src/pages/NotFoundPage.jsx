import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto my-16 text-center ">
      <h2 className="text-darkslategray">404</h2>
      <p className="my-4">抱歉，找不到您要的頁面</p>
      <Link to="/" className="text-darkslategray font-bold">回到首頁</Link>
    </div>
  );
}
