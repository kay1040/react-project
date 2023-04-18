import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../store/api/productsApi';
import Loading from '../components/UI/Loading';
import ProductFilter from '../components/Shop/ProductFilter';
import ProductList from '../components/Shop/ProductList';

export default function ShopPage() {
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
  } = useGetProductsQuery();
  const [productsList, setProductsList] = useState([]);
  const { state: keyword } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setProductsList(products);
    if (keyword) {
      const filterProducts = products?.filter((item) => item.name.indexOf(keyword) !== -1);
      setProductsList(filterProducts);
    }
  }, [isSuccess, keyword]);

  const handleChangeCategory = (newCategory) => {
    navigate('/shop', { state: null });
    if (newCategory === '所有商品') {
      setProductsList(products);
    } else {
      const filterProducts = products?.filter((item) => item.category === newCategory);
      setProductsList(filterProducts);
    }
  };
  const handleChangeSort = (newSort) => {
    if (newSort === 'ascending') {
      const sortProducts = [...productsList];
      sortProducts.sort((a, b) => a.price - b.price);
      setProductsList(sortProducts);
    } else if (newSort === 'descending') {
      const sortProducts = [...productsList];
      sortProducts.sort((a, b) => b.price - a.price);
      setProductsList(sortProducts);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-6 md:mt-8 mb-8 md:mb-16">
      {isLoading && <Loading />}
      {isError && <div className="mt-24 text-center text-lg mb-3">商品資料載入失敗</div>}
      {isSuccess && (productsList?.length === 0
        ? (
          <div className="mt-24 text-center">
            <p className="text-lg mb-3">查無此商品</p>
            <Link to="/shop" className="text-base font-bold text-[#599b9b]" onClick={() => setProductsList(products)}>前往商店</Link>
          </div>
        )
        : (
          <div className="mt-8 md:mx-8 md:mt-10">
            <ProductFilter
              onCategoryChange={handleChangeCategory}
              onSortChange={handleChangeSort}
            />
            <ProductList products={productsList} />
          </div>
        )
      )}
    </div>
  );
}
