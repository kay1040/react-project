import React, { useRef } from 'react'
import styles from './SearchProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchProduct = () => {
    const keywordInput = useRef();
    const navigate = useNavigate();

    const searchProductHandler = (e) => {
        e.preventDefault();
        const keyword = keywordInput.current.value.trim();
        navigate("/shop", { state: keyword })
        keywordInput.current.value = '';
    };

    return (
        <div className={styles.search}>
            <form onSubmit={searchProductHandler}>
                <input
                    className={styles.searchInput}
                    ref={keywordInput}
                    type="text"
                    placeholder="搜尋商品">
                </input>
                <button className={styles.searchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </div>
    )
}

export default SearchProduct;

