// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Col, Row } from 'antd';
// import { useGetTutorialsQuery } from '../store/api/tutorialsApi';
// import Loading from '../components/UI/Loading';
// import TutorialFilter from '../components/Tutorial/TutorialFilter';
// import TutorialCard from '../components/Tutorial/TutorialCard';

// export default function TutorialPage() {
//   const {
//     data: tutorialsData,
//     isSuccess,
//     isLoading,
//     isError,
//   } = useGetTutorialsQuery();

//   const [category, setCategory] = useState('所有教學');

//   // 篩選資料
//   let filterTutorialData;
//   if (category === '所有教學') {
//     filterTutorialData = tutorialsData;
//   } else {
//     filterTutorialData = tutorialsData.filter((item) => item.attributes.category === category);
//   }

//   const handleChangeCategory = (newCategory) => {
//     setCategory(newCategory);
//   };

//   return (
//     <div className="max-w-screen-xl mx-auto my-8 md:my-16">
//       {isLoading && <Loading />}
//       {isError && <div className="mt-24 text-center text-lg mb-3">資料載入失敗</div>}
//       {isSuccess
//         && (
//           <>
//             <TutorialFilter onCategoryChange={handleChangeCategory} />
//             <Row
//               justify="center"
//               gutter={{
//                 xs: 8, sm: 16, md: 24, lg: 32,
//               }}
//             >
//               {filterTutorialData.map((data) => (
//                 <Col key={data.id}>
//                   <Link to={`${data.id}`}>
//                     <TutorialCard filterTutorialData={data} />
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           </>
//         )}
//     </div>
//   );
// }

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useGetTutorialsQuery } from '../store/api/tutorialsApi';
import Loading from '../components/UI/Loading';
import TutorialVideo from '../components/Tutorial/TutorialVideo';
import TutorialMenu from '../components/Tutorial/TutorialMenu';
// import TutorialFilter from '../components/Tutorial/TutorialFilter';
// import TutorialCard from '../components/Tutorial/TutorialCard';

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
            {selectedVideo.attributes.category}
            -
            {selectedVideo.attributes.title}
          </h2>
          <div className="flex flex-col md:flex-row mt-12 md:mx-16">
            <div>
              <TutorialVideo
                url={selectedVideo.attributes.video}
              />
            </div>
            <div>
              <TutorialMenu
                videos={tutorialsList}
                onVideoSelected={(index) => setSelectedVideoIndex(index)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
