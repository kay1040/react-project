import React, { useState } from 'react';
import { useGetTutorialsQuery } from '../store/api/tutorialsApi';
import Loading from '../components/UI/Loading';
import TutorialVideo from '../components/Tutorial/TutorialVideo';
import TutorialMenu from '../components/Tutorial/TutorialMenu';

export default function TutorialPage() {
  const {
    data: tutorialsList,
    isSuccess,
    isLoading,
    isError,
  } = useGetTutorialsQuery();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const selectedVideo = isSuccess ? tutorialsList[selectedVideoIndex] : null;

  return (
    <div className="max-w-screen-xl mx-auto my-8 md:my-16">
      {isLoading && <Loading />}
      {isError && <div className="mt-24 text-center text-lg mb-3">資料載入失敗</div>}
      {isSuccess && (
        <>
          <h2 className="text-center">
            {selectedVideo.category}
            -
            {selectedVideo.name}
          </h2>
          <div className="flex flex-col md:flex-row mt-12 md:mx-16">
            <div>
              <TutorialVideo
                url={selectedVideo.videoUrl}
              />
            </div>
            <div>
              <TutorialMenu
                tutorials={tutorialsList}
                onTutorialSelected={(index) => setSelectedVideoIndex(index)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
