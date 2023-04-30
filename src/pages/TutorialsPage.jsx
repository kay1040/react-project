import React, { useEffect, useState } from 'react';
import { useGetTutorialsQuery } from '../store/api/tutorialsApi';
import Loading from '../components/UI/Loading';
import TutorialVideo from '../components/Tutorials/TutorialVideo';
import TutorialsMenu from '../components/Tutorials/TutorialsMenu';

export default function TutorialPage() {
  const {
    data,
    isSuccess,
    isLoading,
    isError,
  } = useGetTutorialsQuery();
  const [tutorialsList, setTutorialsList] = useState([]);
  const selectedTutorial = isSuccess ? tutorialsList[0] : null;

  useEffect(() => {
    if (isSuccess) {
      setTutorialsList(data);
    }
  }, [isSuccess]);

  const handleSelectVideo = (index) => {
    const newList = [...data];
    const clickedTutorial = tutorialsList[index];
    const clickedIndex = newList.indexOf(clickedTutorial);
    newList.splice(clickedIndex, 1);
    newList.unshift(clickedTutorial);
    setTutorialsList(newList);
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-12 md:my-16">
      {isLoading && <Loading />}
      {isError && <div className="mt-24 text-center text-lg mb-3">資料載入失敗</div>}
      {isSuccess && (
        <div className="flex flex-col md:flex-row md:justify-center">
          <div>
            <TutorialVideo
              url={selectedTutorial?.videoUrl}
            />
          </div>
          <div>
            <TutorialsMenu
              tutorials={tutorialsList}
              videoIndex={0}
              onSelectVideo={handleSelectVideo}
            />
          </div>
        </div>
      )}
    </div>
  );
}
