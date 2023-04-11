import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import SearchProduct from '../Shop/SearchProduct';
import CartPreview from '../Cart/CartPreview';

export default function NavBar(props) {
  // 設定是否顯示左側菜單
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { onScroll } = props;

  const handleShowLeftMenu = () => {
    setShowLeftMenu(!showLeftMenu);
  };

  const handleCloseCartPreview = () => {
    setShowCartPreview(false);
  };

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    onScroll(showCartPreview);
  }, [showCartPreview]);

  const { pathname } = useLocation();

  useEffect(() => {
    setShowLeftMenu(false);
  }, [pathname]);

  return (
    // 導航條外層
    <header className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        {/* 左側菜單 */}
        <div className={styles.leftMenu}>
          {/*  菜單圖標 */}
          <ul
            role="menu"
            className={styles.menuIcon}
            onClick={handleShowLeftMenu}
            onKeyDown={handleShowLeftMenu}
          >
            <li className={showLeftMenu ? `${styles.line1} ${styles.line1Active}` : styles.line1} />
            <li className={showLeftMenu ? ` ${styles.line2Active}` : styles.line2} />
            <li className={showLeftMenu ? `${styles.line3} ${styles.line3Active}` : styles.line3} />
          </ul>

          {/* 菜單 */}
          <ul className={showLeftMenu ? `${styles.nav} ${styles.navActive}` : styles.nav}>
            <li className={styles.login}><Link to="/user/profile" onClick={handleShowLeftMenu}>{auth.isLogged ? '會員資料' : '登入 / 註冊'}</Link></li>
            <li><Link to="/about" onClick={handleShowLeftMenu}>關於我們</Link></li>
            <li><Link to="/intro" onClick={handleShowLeftMenu}>認識纏花</Link></li>
            <li><Link to="/course" onClick={handleShowLeftMenu}>纏花製作</Link></li>
            <li><Link to="/shop" onClick={handleShowLeftMenu}>購買纏花</Link></li>
            <li className={styles.search}>
              <SearchProduct handleShowLeftMenu={handleShowLeftMenu} />
            </li>
          </ul>
        </div>

        {/* logo */}
        <div className={styles.logo}>
          <Link to="/" onClick={() => setShowLeftMenu(false)}><img src="/flower-field/imgs/logo.png" alt="logo" /></Link>
        </div>
        {/* 購物車 */}
        <button
          type="button"
          className={styles.cart}
          onClick={(e) => { setShowCartPreview(true); e.stopPropagation(); }}
        >
          {cart.totalQuantity === 0
            ? null
            : (
              <div className={styles.totalQuantity}>
                {cart.totalQuantity}
              </div>
            )}
          <i><FontAwesomeIcon icon={faCartShopping} /></i>
        </button>
        {/* 右側導航 */}
        <div className={styles.rightNav}>
          <div className={styles.search}>
            <SearchProduct />
          </div>
          <button
            type="button"
            className={styles.cart}
            onClick={(e) => { setShowCartPreview(true); e.stopPropagation(); }}
          >
            {cart.totalQuantity === 0
              ? null
              : (
                <div className={styles.totalQuantity}>
                  {cart.totalQuantity}
                </div>
              )}
            <i><FontAwesomeIcon icon={faCartShopping} /></i>
            {showCartPreview && <CartPreview onClose={handleCloseCartPreview} showCartPreview={showCartPreview} />}
          </button>
          <div className={styles.user}>
            <Link to="/user/profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
