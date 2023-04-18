import React from 'react';

export default function VideoList(props) {
  const { videos, onVideoSelected } = props;

  return (
    <ul>
      {videos.map((video, index) => (
        <li key={video.id}>
          <button type="button" onClick={() => onVideoSelected(index)}>
            {video.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
