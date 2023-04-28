import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeFromFavoritesList } from '../../store/reducers/favoritesSlice';
import { addToCart } from '../../store/reducers/cartSlice';
import ConfirmModal from '../UI/ConfirmModal';

export default function FavoritesList() {
  const favoritesList = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleShowConfirm = (item) => {
    setShowConfirm(true);
    setDeleteItem({ ...item });
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    dispatch(removeFromFavoritesList(deleteItem));
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && (
        <ConfirmModal
          confirmText="確定要刪除這個收藏嗎？"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      <div className="mx-auto mb-24 w-11/12 md:w-3/4 border border-slate-200 rounded rounded-tl-none p-4 md:p-8">
        {favoritesList.length === 0
          ? (
            <div className="leading-loose">
              <p>您目前沒有收藏任何商品</p>
              <p className="mb-4">點擊商品頁的愛心按鈕，可以將喜歡的商品加入收藏</p>
              <Link to="/shop" className="text-base font-bold text-[#599b9b]">前往商店</Link>
            </div>
          )
          : (
            <table className="overflow-hidden box-border border-collapse w-full md:text-center text-sm">
              <thead className="hidden md:table-header-group">
                <tr className="border">
                  <th className="md:py-2">商品</th>
                  <th className="md:py-2">價格</th>
                  <th className="md:py-2">操作</th>
                  <th className="md:py-2">刪除</th>
                </tr>
              </thead>
              <tbody>
                {favoritesList.map((item) => (
                  <tr key={item.id} className="relative border flex flex-col mb-6 md:table-row">
                    <td className="mt-4 mx-4 md:px-4 md:py-6">
                      <Link to={`/shop/product/${item.id}`} className="md:flex items-center">
                        <img className="w-full mb-2 md:w-40 md:mr-4" src={item.imgPath} alt={item.name} />
                        <p>{item.name}</p>
                      </Link>
                    </td>
                    <td className="p-4 md:p-6 font-bold">
                      NT$
                      {item.price.toLocaleString('zh-TW')}
                    </td>
                    <td className="md:p-6">
                      <button
                        type="button"
                        className="btn-primary text-sm font-bold rounded-none hover-none py-2 w-full md:w-28 md:rounded"
                        onClick={() => {
                          const count = 1;
                          dispatch(addToCart([item, count]));
                        }}
                      >
                        加入購物車
                      </button>
                    </td>
                    <td className="absolute top-0 right-0 m-1 md:static md:p-6 md:text-center">
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="text-stone-400"
                        onClick={() => handleShowConfirm(item)}
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
