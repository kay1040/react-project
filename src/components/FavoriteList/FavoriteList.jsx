import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeFromFavoriteList } from '../../store/reducer/productsSlice';
import { addToCart } from '../../store/reducer/cartSlice';
import Confirm from '../UI/ConfirmModal/ConfirmModal';

function FavoriteList() {
  const favoriteList = useSelector((state) => state.products.favoriteList);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const showConfirmHandler = (item) => {
    setShowConfirm(true);
    setDeleteItem({ ...item });
  };

  const cancelHandler = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const confirmHandler = () => {
    dispatch(removeFromFavoriteList(deleteItem));
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && <Confirm confirmText="確定要移除收藏嗎？" onCancel={cancelHandler} onConfirm={confirmHandler} />}
      <div className="mx-auto w-[90%] md:w-4/5 border border-[#ddd] rounded rounded-tl-none p-8">
        {favoriteList.length === 0
          ? (
            <div className="leading-loose">
              <p>您目前沒有收藏任何商品</p>
              <p className="mb-4">點擊商品頁的愛心按鈕，可以將喜歡的商品加入收藏</p>
              <Link to="/shop" className="text-base font-bold text-[#599b9b]">前往商店</Link>
            </div>
          )
          : (
            <table className="overflow-hidden box-border border-collapse w-full">
              <thead className="hidden md:table-header-group">
                <tr className="text-left border">
                  <th className="px-6 py-2">商品</th>
                  <th className="px-6 py-2">價格</th>
                  <th className="px-6 py-2">操作</th>
                  <th className="px-6 py-2">刪除</th>
                </tr>
              </thead>
              <tbody>
                {favoriteList.map((item) => (
                  <tr key={item.id} item={item} className="relative border flex flex-col mb-6 md:table-row">
                    <td className="mt-4 mx-4 md:px-4 md:py-6">
                      <Link to={`/shop/product/${item.id}`} className="md:flex items-center">
                        <img className="w-full mb-2 md:w-48 md:mr-4" src={item.attributes.imgSrc} alt={item.attributes.title} />
                        <p className="text-base">{item.attributes.title}</p>
                      </Link>
                    </td>
                    <td className="p-4 md:p-6">
                      NT$
                      {' '}
                      {item.attributes.price.toLocaleString('en-US')}
                    </td>
                    <td className="md:p-6">
                      <button
                        type="button"
                        className="btn-primary font-bold rounded-none hover-none py-2 w-full md:w-28 md:rounded"
                        onClick={() => {
                          dispatch(addToCart([item, count]));
                          setCount(1);
                        }}
                      >
                        加入購物車
                      </button>
                    </td>
                    <td className="absolute top-0 right-0 m-1 md:static md:p-6 md:text-center">
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="text-stone-400"
                        onClick={() => showConfirmHandler(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </>
  );
}

export default FavoriteList;
