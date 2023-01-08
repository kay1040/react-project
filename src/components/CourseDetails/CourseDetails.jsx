import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCoursesQuery } from '../../store/api/coursesApi';
import Loading from '../UI/Loading/Loading';

function CourseDetails() {
  const { data: coursesData, isSuccess, isLoading } = useGetCoursesQuery();
  const { id } = useParams();
  let course;
  if (isSuccess) course = coursesData.find((item) => item.id === +id);

  return (
    <>
      {isLoading && <div className="my-48"><Loading /></div>}
      {isSuccess
                && (
                <div className="max-w-screen-xl mx-auto mt-8 md:mt-16 mb-24 text-center">
                  <h2>
                    {course.attributes.category}
                    {' '}
                    -
                    {' '}
                    {course.attributes.title}
                  </h2>
                  <iframe
                    className="mx-auto mt-12 aspect-video md:w-[784px] md:h-[441px]"
                    src={course.attributes.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                )}
    </>
  );
}

export default CourseDetails;
