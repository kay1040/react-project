import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

export default function TutorialCard(props) {
  const { filterTutorialData } = props;
  return (
    <Card
      hoverable
      className="w-64 mt-16"
      cover={(
        <img
          src={filterTutorialData.attributes.imgSrc}
          alt={filterTutorialData.attributes.title}
        />
      )}
    >
      <Meta
        title={filterTutorialData.attributes.title}
        description={filterTutorialData.attributes.category}
      />
    </Card>
  );
}
