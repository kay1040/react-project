import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SearchProducts.module.css';

function SearchProducts({ onCloseLeftMenu }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword('');
  }, [pathname]);

  const handleSearchProducts = (e) => {
    e.preventDefault();
    navigate('/shop', { state: { keyword } });
    setKeyword('');
    onCloseLeftMenu();
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSearchProducts}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="搜尋商品"
          value={keyword}
          onChange={(e) => { setKeyword(e.target.value.trim()); }}
        />
        <button type="submit" className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default React.memo(SearchProducts);
