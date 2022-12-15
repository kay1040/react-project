import React from "react";
import styles from "./Traditions.module.css";

const traditionlImgs = [
  {id: 1, title: '雙石榴花', img: '/imgs/tradition/item_01.png'},
  {id: 2, title: '桔子花', img: '/imgs/tradition/item_02.png'},
  {id: 3, title: '婆婆花', img: '/imgs/tradition/item_03.png'},
  {id: 4, title: '五福花', img: '/imgs/tradition/item_04.png'},
  {id: 5, title: '百合花', img: '/imgs/tradition/item_05.png'},
  {id: 6, title: '梅花', img: '/imgs/tradition/item_06.png'},
  {id: 7, title: '單石榴花', img: '/imgs/tradition/item_07.png'},
  {id: 8, title: '皇冠花', img: '/imgs/tradition/item_08.png'},
  {id: 9, title: '玫瑰花', img: '/imgs/tradition/item_09.png'},
  {id: 10, title: '蝴蝶花', img: '/imgs/tradition/item_10.png'},
  {id: 11, title: '牡丹花', img: '/imgs/tradition/item_11.png'},
  {id: 12, title: '圓子花', img: '/imgs/tradition/item_12.png'},
];

export default function Traditions() {
  return (
    <div className={styles.wrapper}>
        {traditionlImgs.map(item => {
          return <div className={styles.imgs} key={item.id}><img src={item.img} title={item.title} /></div>
        })}
    </div>
  );
}
