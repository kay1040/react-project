import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import SearchProduct from '../SearchProduct/SearchProduct';
import CartPreview from '../CartPreview/CarPreview';


const NavBar = () => {

    // 設定是否顯示左側菜單
    const [showLeftMenu, setShowLeftMenu] = useState(false);
    const [showCartPreview, setShowCartPreview] = useState(false);


    const showLeftMenuHandler = () => {
        setShowLeftMenu(!showLeftMenu);
    };

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
 


    return (
        // 導航條外層
        <header className={styles.navbarWrapper}>
            <div className={styles.navbar}>
            {/* 左側菜單 */}
            <div className={styles.leftMenu}>
                {/*  菜單圖標 */}
                <ul className={styles.menuIcon} onClick={showLeftMenuHandler}>
                    <li className={showLeftMenu ? `${styles.line1} ${styles.line1Active}` : styles.line1}></li>
                    <li className={showLeftMenu ? ` ${styles.line2Active}` : styles.line2}></li>
                    <li className={showLeftMenu ? `${styles.line3} ${styles.line3Active}` : styles.line3}></li>
                </ul>

                {/* 菜單 */}
                <ul className={showLeftMenu ? `${styles.nav} ${styles.navActive}` : styles.nav}>
                    <li className={styles.login}><Link to="/profile/account">{auth.isLogged ? '會員資料' : '登入 / 註冊'}</Link></li>
                    <li><Link to="/about">關於我們</Link></li>
                    <li><Link to="/intro">認識纏花</Link></li>
                    <li><Link to="/course">纏花製作</Link></li>
                    <li><Link to="/shop">購買纏花</Link></li>
                    <li className={styles.search}>
                        <SearchProduct/>
                    </li>
                </ul>
            </div>
           
            {/* logo */}
            <div className={styles.logo}>
                <Link to="/"><img src="/imgs/logo.png" alt="logo" /></Link>
            </div>
            {/* 購物車 */}
            <div className={styles.cart}> 
            
            {cart.totalQuantity === 0 ? null : <div className={styles.totalQuantity}>{cart.totalQuantity}</div> }
                    <Link to="/shop/cart">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
            </div>
            {/* 右側導航 */}
            <div className={styles.rightNav}>
                <div className={styles.search}>
                    <SearchProduct/>
                </div>
                <div className={styles.cart} onMouseEnter={()=>setShowCartPreview(true)} onMouseLeave={()=>setShowCartPreview(false)}>
                {cart.totalQuantity === 0 ? null : <div className={styles.totalQuantity}>{cart.totalQuantity}</div> }
                    <Link to="/shop/cart" >
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                    {showCartPreview &&<CartPreview className={styles.cartPreview}/>}
                </div>
                <div className={styles.user}>
                    <Link to="/profile/account">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </div>
            </div>
            </div>
        </header>
    );
};

export default NavBar;