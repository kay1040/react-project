import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faHeart as heartActive } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { addToCart } from "../../store/reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToFavoriteList, removeFromFavoriteList } from '../../store/reducer/productsSlice';
import { useGetProductsQuery } from '../../store/api/productsApi';
import Loading from '../UI/Loading/Loading';

const ProductDetails = () => {
    const { data: products, isSuccess, isLoading } = useGetProductsQuery();
    const { id } = useParams();
    let product;
    if (isSuccess) product = products.find(item => item.id === +id);

    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const favoriteList = useSelector((state) => state.products.favoriteList);
    const [favorite, setFavorite] = useState(false);

    let index;
    if (isSuccess) index = favoriteList.findIndex((item) => item.id === product.id);

    useEffect(() => {
        if (index !== -1) setFavorite(true);
    }, [favoriteList]);

    const addButtonHandler = () => {
        setCount(prevCount => prevCount + 1);
    }

    const subButtonHandler = () => {
        if (count > 1) setCount(prevCount => prevCount - 1);
    }

    const inputChangeHandler = (e) => {
        if (e.target.value > 0) {
            setCount(+e.target.value);
        }
    }

    const addToCartHandler = () => {
        dispatch(addToCart([product, count]));
        setCount(1);
        // alert('商品已加到購物車!');
    };

    const addToFavoriteHandler = () => {
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
            {isLoading && <div className="mt-48"><Loading /></div>}
            {isSuccess &&
                <>
                    <div className={styles.nav}>
                        <Link to="/">首頁</Link>
                        <Link to="/shop">商店</Link>
                        {product.attributes.title}
                    </div>
                    <div className={styles.productDetails}>
                        <div className={styles.productImg}>
                            <img src={product.attributes.imgSrc} />
                        </div>
                        <div className={styles.infoWrapper}>
                            <h3>{product.attributes.title} <i className={styles.favorite} onClick={addToFavoriteHandler}><FontAwesomeIcon icon={favorite ? heartActive : faHeart} /></i></h3>
                            <p>{product.attributes.description}</p>
                            <div className={styles.price}><span>NT$ </span>{product.attributes.price.toLocaleString('en-US')}</div>
                            <div className={styles.counter}>
                                <button className={styles.sub} onClick={subButtonHandler}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input type="text" value={count} onChange={inputChangeHandler} className={styles.count} />
                                <button className={styles.add} onClick={addButtonHandler}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <div className={styles.buyButtons}>
                                <button onClick={addToCartHandler}>加入購物車</button>
                                <Link to="/shop/cart" state={product}>
                                    <button onClick={addToCartHandler}>立即購買</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ProductDetails;