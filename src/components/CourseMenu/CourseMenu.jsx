import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faFan } from '@fortawesome/free-solid-svg-icons';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('基本技法', 'sub1', <FontAwesomeIcon icon={faLeaf} />, [
    getItem('葉子', '1'),
    getItem('帶金', '2'),
    getItem('捻線', '3'),
  ]),
  getItem('傳統款', 'sub2', <FontAwesomeIcon icon={faFan} />, [
    getItem('百合', '4'),
    getItem('圓仔花', '5'),
    getItem('玉蘭花', '6'),
    getItem('五福花', '7'),
    getItem('梅花', '8'),
  ]),
];

const App = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log(e.key);
    navigate(`/course/${e.key}`);
  };

  return (
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          marginTop: 72,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />

  );
};

export default App;