import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/reducers/cartSlice';
import { addToFavoritesList, removeFromFavoritesList, savefavoritesList } from '../store/reducers/favoritesSlice';
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
  const [favorite, setFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { currentUser } = useAuth();

  const index = isSuccess ? favoritesList.findIndex((item) => item.id === product.id) : null;

  useEffect(() => {
    if (index !== -1) setFavorite(true);
  }, [index]);

  useEffect(() => {
    if (currentUser?.uid) dispatch(savefavoritesList([favoritesList, currentUser.uid]));
  }, [currentUser, dispatch, favoritesList]);

  const handleIncreaseButton = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [dispatch, product, count]);

  const handleDecreaseButton = useCallback(() => {
    if (count > 1) setCount((prevCount) => prevCount - 1);
  }, [dispatch, product, count]);

  const handleInputChange = useCallback((e) => {
    if (e.target.value > 0) {
      setCount(+e.target.value);
    }
  }, [dispatch, product, count]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart([product, count]));
    setCount(1);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }, [dispatch, product, count]);

  const handleAddToFavorite = useCallback(() => {
    if (favorite) {
      dispatch(removeFromFavoritesList(product));
      setFavorite(false);
    } else {
      dispatch(addToFavoritesList(product));
      setFavorite(true);
    }
  }, [product, dispatch, favorite]);

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
                <img src={product.imgPath} alt={product.name} />
              </div>
              <div className="w-4/5 md:w-1/2 mt-6 md:mt-1">
                <h2>
                  {product.name}
                  {' '}
                  <button type="button" className="ml-3 text-[#FA8072] cursor-pointer" onClick={handleAddToFavorite}>
                    <FontAwesomeIcon icon={favorite ? heartActive : faHeart} />
                  </button>
                </h2>
                <p className="my-3 md:my-6">{product.description}</p>
                <div className="font-bold text-lg before:content-['NT$'] mb-10">
                  {product.price.toLocaleString('en-US')}
                </div>
                <Counter
                  count={count}
                  onIncrease={handleIncreaseButton}
                  onDecrease={handleDecreaseButton}
                  onInputChange={handleInputChange}
                  buttonStyle="w-7 h-7 text-sm"
                  inputStyle="mx-3 w-20 text-lg font-bold"
                />
                <div className="flex md:block justify-between mt-12">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-primary w-36 md:w-48 py-2 font-bold"
                  >
                    加入購物車
                  </button>
                  <Link to="/shop/cart">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="btn-primary w-36 md:w-48 py-2 font-bold md:ml-5"
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
