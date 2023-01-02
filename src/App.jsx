import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IntroPage from './pages/IntroPage';
import CoursePage from './pages/CoursePage';
import ShopPage from './pages/ShopPage';
import Layout from './components/Layout/Layout';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
import NeedAuth from './components/NeedAuth/NeedAuth';
import useAutoLogout from './hooks/useAutoLogout';
import useScrollToTop from './hooks/useScrollToTop';
import FavoriteList from './components/FavoriteList/FavoriteList';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/ChangePassword/ChangePassword';

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
        <Route path="user" element={<NeedAuth><ProfilePage /></NeedAuth>}>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/change-password" element={<ChangePassword />} />
          <Route path="favorite" element={<FavoriteList />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
