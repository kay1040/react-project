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
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import NeedAuth from './components/NeedAuth/NeedAuth';
import useAutoLogout from './hooks/useAutoLogout';
import FavoriteList from './components/FavoriteList/FavoriteList';
import Profile from './components/Profile/Profile';

function App() {
  // 自動登出
  useAutoLogout();

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
        <Route path="profile" element={<NeedAuth><ProfilePage /></NeedAuth>}>
          <Route path="account" element={<Profile />} />
          <Route path="favorite" element={<FavoriteList />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
