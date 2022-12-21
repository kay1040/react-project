import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
import SearchProduct from '../SearchProduct/SearchProduct';
import CartPreview from '../CartPreview/CarPreview';

function NavBar() {
  // 設定是否顯示左側菜單
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const showLeftMenuHandler = () => {
    setShowLeftMenu(!showLeftMenu);
  };

  const closeCartPreviewHandler = () => {
    setShowCartPreview(false);
  };

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
  // 導航條外層
    <header className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        {/* 左側菜單 */}
        <div className={styles.leftMenu}>
          {/*  菜單圖標 */}
          <ul
            role="menu"
            className={styles.menuIcon}
            onClick={showLeftMenuHandler}
            onKeyDown={showLeftMenuHandler}
          >
            <li className={showLeftMenu ? `${styles.line1} ${styles.line1Active}` : styles.line1} />
            <li className={showLeftMenu ? ` ${styles.line2Active}` : styles.line2} />
            <li className={showLeftMenu ? `${styles.line3} ${styles.line3Active}` : styles.line3} />
          </ul>

          {/* 菜單 */}
          <ul className={showLeftMenu ? `${styles.nav} ${styles.navActive}` : styles.nav}>
            <li className={styles.login}><Link to="/profile/account" onClick={showLeftMenuHandler}>{auth.isLogged ? '會員資料' : '登入 / 註冊'}</Link></li>
            <li><Link to="/about" onClick={showLeftMenuHandler}>關於我們</Link></li>
            <li><Link to="/intro" onClick={showLeftMenuHandler}>認識纏花</Link></li>
            <li><Link to="/course" onClick={showLeftMenuHandler}>纏花製作</Link></li>
            <li><Link to="/shop" onClick={showLeftMenuHandler}>購買纏花</Link></li>
            <li className={styles.search}>
              <SearchProduct showLeftMenuHandler={showLeftMenuHandler} />
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
          onClick={() => setShowCartPreview(!showCartPreview)}
        >
          {cart.totalQuantity === 0
            ? null
            : (
              <div className={styles.totalQuantity}>
                {cart.totalQuantity}
              </div>
            ) }
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
            // 不能設定成flase??
            onClick={() => setShowCartPreview(!showCartPreview)}
          >
            {cart.totalQuantity === 0
              ? null
              : (
                <div className={styles.totalQuantity}>
                  {cart.totalQuantity}
                </div>
              ) }
            <i><FontAwesomeIcon icon={faCartShopping} /></i>
            {showCartPreview && <CartPreview className={styles.cartPreview} onClose={closeCartPreviewHandler} />}
          </button>
          <div className={styles.user}>
            <Link to="/profile/account">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
