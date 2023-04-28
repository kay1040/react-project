import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import SearchProducts from '../Shop/SearchProducts';
import CartPreview from '../Checkout/CartPreview';
import useAuth from '../../hooks/useAuth';
import useDisableScroll from '../../hooks/useDisableScroll';

export default function NavBar() {
  const [isShowLeftMenu, setIsShowLeftMenu] = useState(false);
  const [isShowCartPreview, setIsShowCartPreview] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const { currentUser } = useAuth();
  const { cart } = useSelector((state) => state);
  const { pathname } = useLocation();

  useDisableScroll(isShowLeftMenu);

  useEffect(() => {
    setIsShowLeftMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (currentUser?.uid) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [currentUser]);

  const handleToggleLeftMenu = () => {
    setIsShowLeftMenu((preState) => !preState);
  };

  const handleCloseLeftMenu = useCallback(() => {
    setIsShowLeftMenu(false);
  }, []);

  const handleCloseCartPreview = () => {
    setIsShowCartPreview(false);
  };

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
            onClick={handleToggleLeftMenu}
            onKeyDown={handleToggleLeftMenu}
          >
            <li className={isShowLeftMenu ? `${styles.line1} ${styles.line1Active}` : styles.line1} />
            <li className={isShowLeftMenu ? ` ${styles.line2Active}` : styles.line2} />
            <li className={isShowLeftMenu ? `${styles.line3} ${styles.line3Active}` : styles.line3} />
          </ul>

          {/* 菜單 */}
          <ul className={isShowLeftMenu ? `${styles.nav} ${styles.navActive}` : styles.nav}>
            <li className={styles.login}>
              <Link to="/user/profile">
                {isLogged ? '會員資料' : '登入 / 註冊'}
              </Link>
            </li>
            <li><Link to="/about">關於我們</Link></li>
            <li><Link to="/intro">認識纏花</Link></li>
            <li><Link to="/tutorials">纏花教學</Link></li>
            <li><Link to="/shop">纏花商店</Link></li>
            <li className={styles.search}>
              <SearchProducts onCloseLeftMenu={handleCloseLeftMenu} />
            </li>
          </ul>
        </div>

        {/* logo */}
        <div className={styles.logo}>
          <Link to="/" onClick={handleCloseLeftMenu}>
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        {/* 購物車 */}
        <button
          type="button"
          className={styles.cart}
          onClick={() => { setIsShowCartPreview(true); }}
        >
          {cart.cartItems.length === 0
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
            <SearchProducts />
          </div>
          <button
            type="button"
            className={styles.cart}
            onClick={() => { setIsShowCartPreview(true); }}
          >
            {cart.totalQuantity === 0
              ? null
              : (
                <div className={styles.totalQuantity}>
                  {cart.totalQuantity}
                </div>
              )}
            <i><FontAwesomeIcon icon={faCartShopping} /></i>
            {isShowCartPreview && (
              <CartPreview
                onCloseCartPreview={handleCloseCartPreview}
                isShowCartPreview={isShowCartPreview}
                cart={cart}
              />)}
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
