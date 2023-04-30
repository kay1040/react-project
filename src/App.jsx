import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TutorialsPage from './pages/TutorialsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import NeedAuth from './components/NeedAuth/NeedAuth';
import Profile from './components/User/Profile';
import MyOrder from './components/User/OrdersList';
import OrderDetails from './components/User/OrderDetails';
import FavoritesList from './components/User/FavoritesList';
import useScrollToTop from './hooks/useScrollToTop';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/UI/Loading';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const IntroPage = lazy(() => import('./pages/IntroPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const UserPage = lazy(() => import('./pages/UserPage'));

export default function App() {
  // 設定路由跳轉回到頁面頂端
  useScrollToTop();

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="tutorials" element={<TutorialsPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/product/:id" element={<ProductDetailsPage />} />
          <Route path="shop/cart" element={<NeedAuth><CheckoutPage /></NeedAuth>} />
          <Route path="auth_form" element={<AuthPage />} />
          <Route path="user" element={<NeedAuth><UserPage /></NeedAuth>}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<MyOrder />} />
            <Route path="orders/:orderNumber" element={<OrderDetails />} />
            <Route path="favorites" element={<FavoritesList />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
