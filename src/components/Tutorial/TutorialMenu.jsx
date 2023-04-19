import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './TutorialMenu.css';

export default function TutorialMenu(props) {
  const { tutorials, videoIndex, onVideoSelected } = props;
  const [selectedTutorialIndex, setSelectedTutorialIndex] = useState(null);
  const [showDesc, setShowDesc] = useState(false);
  const handleToggle = (index) => {
    setSelectedTutorialIndex(index);
    if (selectedTutorialIndex === index) {
      setShowDesc((prevState) => !prevState);
    } else {
      setShowDesc(true);
    }
  };

  useEffect(() => {
    setSelectedTutorialIndex(0);
    setShowDesc(true);
  }, []);

  return (
    <ul className="menu pt-8 md:pt-0 px-5 md:w-76 md:h-[522px] md:overflow-y-auto overflow-x-hidden">
      {tutorials.map((video, index) => (
        <li key={video.id} className="border md:w-60 rounded mb-2">
          <button
            type="button"
            onClick={() => handleToggle(index)}
            className="px-4 w-full h-14 md:hover:bg-zinc-100 text-left relative text-gray-700 transition-all"
          >
            {video.category}
            -
            {video.name}
            <FontAwesomeIcon
              icon={selectedTutorialIndex === index && showDesc ? faChevronUp : faChevronDown}
              className="absolute right-4 text-sm mt-1"
            />
          </button>
          {selectedTutorialIndex === index && showDesc && (
            <div className="w-full px-4 py-3 border-t">
              <p className="text-sm">{video.description}</p>
              {videoIndex !== index && (
                <button type="button" onClick={() => onVideoSelected(index)} className="text-darkslategray font-bold pt-3">
                  觀看教學影片
                </button>
              )}
            </div>
          )}

        </li>
      ))}
    </ul>
  );
}
