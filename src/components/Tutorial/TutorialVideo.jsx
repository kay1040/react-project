import React from 'react';

export default function VideoPlayer(props) {
  const { url } = props;

  return (
    <div className="w-full h-full aspect-w-16 aspect-h-9 md:w-[928px] md:h-[522px]">
      <iframe
        className="w-full h-full"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  );
}
