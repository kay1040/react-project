import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IntroPage from './pages/IntroPage';
import CoursePage from './pages/CoursePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import NeedAuth from './components/NeedAuth/NeedAuth';
import UserPage from './pages/UserPage';
import Profile from './components/Profile/Profile';
import MyOrder from './components/MyOrder/MyOrder';
import FavoriteList from './components/FavoriteList/FavoriteList';
import useAutoLogout from './hooks/useAutoLogout';
import useScrollToTop from './hooks/useScrollToTop';

function App() {
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
        <Route path="course" element={<CoursePage />} />
        <Route path="course/:id" element={<CourseDetailsPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/product/:id" element={<ProductDetailsPage />} />
        <Route path="shop/cart" element={<CartPage />} />
        <Route path="auth_form" element={<AuthPage />} />
        <Route path="user" element={<NeedAuth><UserPage /></NeedAuth>}>
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<MyOrder />} />
          <Route path="favorite" element={<FavoriteList />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
