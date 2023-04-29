import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, saveCartData } from '../store/reducers/cartSlice';
import { addToFavoritesList, removeFromFavoritesList, saveFavoritesList } from '../store/reducers/favoritesSlice';
import { useGetProductsQuery } from '../store/api/productsApi';
import Loading from '../components/UI/Loading';
import Counter from '../components/UI/Counter';
import Message from '../components/UI/Message';
import useAuth from '../hooks/useAuth';

export default function ProductDetailsPage() {
  const { data: products, isSuccess, isLoading } = useGetProductsQuery();
  const { id } = useParams();
  const product = isSuccess ? products.find((item) => item.id === id) : null;
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const favoritesList = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { currentUser } = useAuth();

  const index = isSuccess ? favoritesList.findIndex((item) => item.id === product.id) : null;

  useEffect(() => {
    if (isSuccess && index !== -1) setIsFavorite(true);
  }, [isSuccess, index]);

  const handleIncreaseCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [count]);

  const handleDecreaseCount = useCallback(() => {
    if (count > 1) setCount((prevCount) => prevCount - 1);
  }, [count]);

  const handleInputChange = useCallback((e) => {
    if (e.target.value > 0) {
      setCount(+e.target.value);
    }
  }, [count]);

  const handleAddToCart = useCallback(() => {
    if (product) dispatch(addToCart([product, count]));
    setCount(1);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
    if (currentUser?.uid) dispatch(saveCartData(currentUser.uid));
  }, [dispatch, product, count, currentUser]);

  const handleAddToFavorite = useCallback(() => {
    if (isFavorite && product) {
      dispatch(removeFromFavoritesList(product));
      setIsFavorite(false);
    } else {
      dispatch(addToFavoritesList(product));
      setIsFavorite(true);
    }
    if (currentUser?.uid) dispatch(saveFavoritesList(currentUser.uid));
  }, [product, dispatch, isFavorite, currentUser]);

  return (
    <div className="max-w-screen-xl mx-auto mb-32">
      {showMessage && <Message message="商品已加入購物車" />}
      {isLoading && <Loading />}
      {isSuccess
        && (
          <>
            <div className="m-5 md:m-10 mb-5 font-bold text-darkslategray">
              <Link to="/" className="hover:text-[#599b9b] after:content-['_/_'] after:text-darkslategray">首頁</Link>
              <Link to="/shop" className="hover:text-[#599b9b] after:content-['_/_'] after:text-darkslategray">商店</Link>
              {product.name}
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-left justify-center md:justify-evenly w-full">
              <div className="w-full md:w-2/5">
                <img src={product.imgPath} alt={product.name} className="w-full" />
              </div>
              <div className="w-4/5 md:w-1/2 mt-6 md:mt-1">
                <h2>
                  {product.name}
                  {' '}
                  <button type="button" className="ml-3 text-[#FA8072] cursor-pointer" onClick={handleAddToFavorite}>
                    <FontAwesomeIcon icon={isFavorite ? heartActive : faHeart} />
                  </button>
                </h2>
                <p className="my-3 md:my-6">{product.description}</p>
                <div className="font-bold text-lg before:content-['NT$'] mb-10">
                  {product.price.toLocaleString('zh-TW')}
                </div>
                <Counter
                  count={count}
                  onIncrease={handleIncreaseCount}
                  onDecrease={handleDecreaseCount}
                  onInputChange={handleInputChange}
                  buttonStyle="w-7 h-7 text-sm"
                  inputStyle="mx-3 w-20 text-lg font-bold"
                />
                <div className="flex md:block justify-between mt-12">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-primary w-[45%] md:w-44 py-2 font-bold"
                  >
                    加入購物車
                  </button>
                  <Link to="/shop/cart" className="w-[45%]">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="btn-primary w-full md:w-44 py-2 font-bold md:ml-5"
                    >
                      立即購買
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
