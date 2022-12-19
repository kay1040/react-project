import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CourseCard = (props) => {
  return (
    <Card
      hoverable
      className="w-64 mt-16"
      cover={<img alt="example" src={props.filterCourseData.attributes.imgSrc} />}
    >
      <Meta title={props.filterCourseData.attributes.title} description={props.filterCourseData.attributes.category} />
    </Card>
  );
}

export default CourseCard;