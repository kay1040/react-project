import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SearchProducts.module.css';

export default function SearchProducts() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setKeyword('');
  }, [pathname]);

  const handleSearchProducts = (e) => {
    e.preventDefault();
    navigate(`/shop?keyword=${keyword}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSearchProducts}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="搜尋商品"
          onChange={(e) => { setKeyword(e.target.value.trim()); }}
        />
        <button type="submit" className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}
