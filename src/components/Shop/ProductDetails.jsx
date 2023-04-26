import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/reducers/cartSlice';
import styles from './ProductDetails.module.css';
import { addToFavoritesList, removeFromFavoritesList, savefavoritesList } from '../../store/reducers/favoritesSlice';
import { useGetProductsQuery } from '../../store/api/productsApi';
import Loading from '../UI/Loading';
import Counter from '../UI/Counter';
import Message from '../UI/Message';
import useAuth from '../../hooks/useAuth';

export default function ProductDetails() {
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
    <div className={styles.productDetailsWrapper}>
      {showMessage && <Message message="商品已添加到購物車" />}
      {isLoading && <div className="mt-48"><Loading /></div>}
      {isSuccess
        && (
          <>
            <div className={styles.nav}>
              <Link to="/">首頁</Link>
              <Link to="/shop">商店</Link>
              {product.name}
            </div>
            <div className={styles.productDetails}>
              <div className={styles.productImg}>
                <img src={product.imgPath} alt={product.name} />
              </div>
              <div className={styles.infoWrapper}>
                <h2>
                  {product.name}
                  {' '}
                  <button type="button" className={styles.favorite} onClick={handleAddToFavorite}>
                    <FontAwesomeIcon icon={favorite ? heartActive : faHeart} />
                  </button>
                </h2>
                <p>{product.description}</p>
                <div className={styles.price}>
                  {product.price.toLocaleString('en-US')}
                </div>
                <div className="my-5">
                  <Counter
                    count={count}
                    onIncrease={handleIncreaseButton}
                    onDecrease={handleDecreaseButton}
                    onInputChange={handleInputChange}
                  />
                </div>
                <div className={styles.buyButtons}>
                  <button type="button" onClick={handleAddToCart}>加入購物車</button>
                  <Link to="/shop/cart" state={product}>
                    <button type="button" onClick={handleAddToCart}>立即購買</button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
