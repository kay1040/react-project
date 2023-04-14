import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/reducers/cartSlice';
import styles from './ProductDetails.module.css';
import { addToFavoriteList, removeFromFavoriteList } from '../../store/reducers/productsSlice';
import { useGetProductsQuery } from '../../store/api/productsApi';
import Loading from '../UI/Loading';
import Counter from '../UI/Counter';
import Message from '../UI/Message';

export default function ProductDetails() {
  const { data: products, isSuccess, isLoading } = useGetProductsQuery();
  const { id } = useParams();
  const product = isSuccess ? products.find((item) => item.id === +id) : null;

  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const favoriteList = useSelector((state) => state.products.favoriteList);
  const [favorite, setFavorite] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const index = isSuccess ? favoriteList.findIndex((item) => item.id === product.id) : null;

  useEffect(() => {
    if (index !== -1) setFavorite(true);
  }, [favoriteList]);

  const handleIncreaseButton = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseButton = () => {
    if (count > 1) setCount((prevCount) => prevCount - 1);
  };

  const handleInputChange = (e) => {
    if (e.target.value > 0) {
      setCount(+e.target.value);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart([product, count]));
    setCount(1);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  const handleAddToFavorite = () => {
    if (favorite) {
      dispatch(removeFromFavoriteList(product));
      setFavorite(false);
    } else {
      dispatch(addToFavoriteList(product));
      setFavorite(true);
    }
  };

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
              {product.attributes.title}
            </div>
            <div className={styles.productDetails}>
              <div className={styles.productImg}>
                <img src={product.attributes.imgSrc} alt={product.attributes.title} />
              </div>
              <div className={styles.infoWrapper}>
                <h2>
                  {product.attributes.title}
                  {' '}
                  <button type="button" className={styles.favorite} onClick={handleAddToFavorite}>
                    <FontAwesomeIcon icon={favorite ? heartActive : faHeart} />
                  </button>
                </h2>
                <p>{product.attributes.description}</p>
                <div className={styles.price}>
                  {product.attributes.price.toLocaleString('en-US')}
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
