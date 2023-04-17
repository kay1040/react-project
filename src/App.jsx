import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IntroPage from './pages/IntroPage';
import TutorialPage from './pages/TutorialPage';
import TutorialDetailsPage from './pages/TutorialDetailsPage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import NeedAuth from './components/NeedAuth/NeedAuth';
import UserPage from './pages/UserPage';
import Profile from './components/User/Profile';
import MyOrder from './components/User/MyOrder';
import FavoriteList from './components/User/FavoriteList';
import useAutoLogout from './hooks/useAutoLogout';
import useScrollToTop from './hooks/useScrollToTop';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  // 自動登出
  useAutoLogout();
  // 路由跳轉回到頁面頂端
  useScrollToTop();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="intro" element={<IntroPage />} />
        <Route path="tutorial" element={<TutorialPage />} />
        <Route path="tutorial/:id" element={<TutorialDetailsPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/product/:id" element={<ProductDetailsPage />} />
        <Route path="shop/cart" element={<CartPage />} />
        <Route path="auth_form" element={<AuthPage />} />
        <Route path="user" element={<NeedAuth><UserPage /></NeedAuth>}>
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<MyOrder />} />
          <Route path="favorite" element={<FavoriteList />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
