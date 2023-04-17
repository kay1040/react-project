import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTutorialsQuery } from '../store/api/tutorialsApi';
import Loading from '../components/UI/Loading';

export default function tutorialDetailsPage() {
  const { data: tutorialsData, isSuccess, isLoading } = useGetTutorialsQuery();
  const { id } = useParams();
  let tutorial;
  if (isSuccess) tutorial = tutorialsData.find((item) => item.id === +id);

  return (
    <>
      {isLoading && <div className="my-48"><Loading /></div>}
      {isSuccess
        && (
          <div className="max-w-screen-xl mx-auto mt-8 md:mt-16 mb-24 text-center">
            <h2>
              {tutorial.attributes.category}
              {' '}
              -
              {' '}
              {tutorial.attributes.title}
            </h2>
            <iframe
              className="mx-auto mt-12 aspect-video md:w-[784px] md:h-[441px]"
              src={tutorial.attributes.video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
    </>
  );
}
