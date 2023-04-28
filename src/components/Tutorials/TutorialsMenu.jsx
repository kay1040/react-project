import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './TutorialsMenu.css';

export default function TutorialsMenu({ tutorials, videoIndex, onVideoSelected }) {
  const [selectedTutorialIndex, setSelectedTutorialIndex] = useState(0);
  const [isShowDesc, setIsShowDesc] = useState(true);

  const handleToggle = (index) => {
    setSelectedTutorialIndex(index);
    if (selectedTutorialIndex === index) {
      setIsShowDesc((prevState) => !prevState);
    } else {
      setIsShowDesc(true);
    }
  };

  return (
    <ul className="menu p-5 md:pt-0 md:w-76 md:h-[450px] md:overflow-y-auto overflow-x-hidden">
      {tutorials.map((video, index) => (
        <li key={video.id} className="border md:w-60 rounded mb-2 transition-all">
          <button
            type="button"
            onClick={() => handleToggle(index)}
            className="px-4 w-full h-12 md:hover:bg-zinc-100 text-left relative text-gray-700 transition-all"
          >
            {video.category}
            -
            {video.name}
            <FontAwesomeIcon
              icon={selectedTutorialIndex === index && isShowDesc ? faChevronUp : faChevronDown}
              className="absolute right-4 text-sm mt-1"
            />
          </button>
          <div className={selectedTutorialIndex === index && isShowDesc ? 'desc-active' : 'desc'}>
            <p className="text-sm py-3">{video.description}</p>
            {videoIndex !== index && (
              <button type="button" onClick={() => { onVideoSelected(index); window.scrollTo(0, 0); }} className="text-darkslategray font-bold py-3">
                觀看教學影片
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
