import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './SearchProduct.module.css';

function SearchProduct(props) {
  const keywordInput = useRef();
  const navigate = useNavigate();
  const { showLeftMenuHandler } = props;

  const searchProductHandler = (e) => {
    e.preventDefault();
    const keyword = keywordInput.current.value.trim();
    navigate('/shop', { state: keyword });
    keywordInput.current.value = '';
    showLeftMenuHandler();
  };

  return (
    <div className={styles.search}>
      <form onSubmit={searchProductHandler}>
        <input
          className={styles.searchInput}
          ref={keywordInput}
          type="text"
          placeholder="搜尋商品"
        />
        <button type="button" className={styles.searchButton} onClick={searchProductHandler}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default SearchProduct;
