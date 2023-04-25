import React, { useState } from 'react';

export default function VideoPlayer(props) {
  const { url } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlayerLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="w-full h-full aspect-w-16 aspect-h-9 md:w-[800px] md:h-[450px]">
      {isLoaded ? null : <div className="absolute inset-0 flex items-center justify-center"><div>影片載入中...</div></div>}
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
