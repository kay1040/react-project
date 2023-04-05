import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import CourseCard from '../CourseCard/CourseCard';
import CourseFilter from '../CourseFilter/CourseFilter';
import { useGetCoursesQuery } from '../../store/api/coursesApi';
import Loading from '../UI/Loading/Loading';

function Course() {
  const {
    data: coursesData,
    isSuccess,
    isLoading,
    isError,
  } = useGetCoursesQuery();

  const [category, setCategory] = useState('所有教學');

  // 篩選資料
  let filterCourseData;
  if (category === '所有教學') {
    filterCourseData = coursesData;
  } else {
    filterCourseData = coursesData.filter((item) => item.attributes.category === category);
  }

  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="max-w-screen-xl mx-auto my-8 md:my-16">
      {isLoading && <Loading />}
      {isError && <div className="mt-24 text-center text-lg mb-3">資料載入失敗</div>}
      {isSuccess
        && (
          <>
            <CourseFilter onCategoryChange={handleChangeCategory} />
            <Row
              justify="center"
              gutter={{
                xs: 8, sm: 16, md: 24, lg: 32,
              }}
            >
              {filterCourseData.map((data) => (
                <Col key={data.id}>
                  <Link to={`${data.id}`}>
                    <CourseCard filterCourseData={data} />
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
    </div>
  );
}

export default Course;
