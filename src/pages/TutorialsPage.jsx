import React, { useState } from 'react';
import { useGetTutorialsQuery } from '../store/api/tutorialsApi';
import Loading from '../components/UI/Loading';
import TutorialVideo from '../components/Tutorials/TutorialVideo';
import TutorialsMenu from '../components/Tutorials/TutorialsMenu';

export default function TutorialPage() {
  const {
    data: tutorialsList,
    isSuccess,
    isLoading,
    isError,
  } = useGetTutorialsQuery();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const selectedTutorial = isSuccess ? tutorialsList[selectedVideoIndex] : null;

  return (
    <div className="max-w-screen-xl mx-auto mb-12 md:my-16">
      {isLoading && <Loading />}
      {isError && <div className="mt-24 text-center text-lg mb-3">資料載入失敗</div>}
      {isSuccess && (
        <div className="flex flex-col md:flex-row md:justify-center">
          <div>
            <TutorialVideo
              url={selectedTutorial.videoUrl}
            />
          </div>
          <div>
            <TutorialsMenu
              tutorials={tutorialsList}
              videoIndex={selectedVideoIndex}
              onVideoSelected={(index) => setSelectedVideoIndex(index)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
