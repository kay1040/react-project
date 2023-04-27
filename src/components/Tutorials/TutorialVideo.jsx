import React, { useState } from 'react';

export default function VideoPlayer({ url }) {
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayerLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full aspect-w-16 aspect-h-9 md:w-[800px] md:h-[450px]">
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-lg">影片載入中...</div>}
      <iframe
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handlePlayerLoad}
      />
    </div>
  );
}
