import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './SearchProduct.module.css';

export default function SearchProduct() {
  const keywordInput = useRef();
  const navigate = useNavigate();

  const handleSearchProduct = (e) => {
    e.preventDefault();
    const keyword = keywordInput.current.value.trim();
    navigate('/shop', { state: { keyword } });
    keywordInput.current.value = '';
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSearchProduct}>
        <input
          className={styles.searchInput}
          ref={keywordInput}
          type="text"
          placeholder="搜尋商品"
        />
        <button type="button" className={styles.searchButton} onClick={handleSearchProduct}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}
