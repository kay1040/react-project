import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

function CourseCard(props) {
  const filterCourseData = { props };
  return (
    <Card
      hoverable
      className="w-64 mt-16"
      cover={(
        <img
          src={filterCourseData.attributes.imgSrc}
          alt={filterCourseData.attributes.title}
        />
      )}
    >
      <Meta
        title={filterCourseData.attributes.title}
        description={filterCourseData.attributes.category}
      />
    </Card>
  );
}

export default CourseCard;
