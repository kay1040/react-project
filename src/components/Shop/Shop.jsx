import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductFilter from './ProductFilter';
import { useGetProductsQuery } from '../../store/api/productsApi';
import Loading from '../UI/Loading';
import ProductList from './ProductList';

export default function Shop() {
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
  } = useGetProductsQuery();
  const [category, setCategory] = useState('所有商品');
  const { state: keyword } = useLocation();
  const [sort, setSort] = useState(null);

  // 篩選商品
  let filterProducts = products;
  if (isSuccess) {
    if (category !== '所有商品') {
      filterProducts = products.filter((item) => item.attributes.category === category);
    }
    if (keyword) {
      filterProducts = filterProducts.filter((item) => item.attributes.title.indexOf(keyword) !== -1);
    }
    if (sort === 'ascending') {
      const sortProducts = [...filterProducts];
      sortProducts.sort((a, b) => a.attributes.price - b.attributes.price);
      filterProducts = sortProducts;
    } else if (sort === 'descending') {
      const sortProducts = [...filterProducts];
      sortProducts.sort((a, b) => b.attributes.price - a.attributes.price);
      filterProducts = sortProducts;
    }
  }

  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory);
  };
  const handleChangeSort = (newSort) => {
    setSort(newSort);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-6 md:mt-8 mb-8 md:mb-16">
      {isLoading && <Loading />}
      {isError && <div className="mt-24 text-center text-lg mb-3">商品資料載入失敗</div>}
      {isSuccess && (filterProducts.length === 0
        ? (
          <div className="mt-24 text-center">
            <p className="text-lg mb-3">查無此商品</p>
            <Link to="/shop" className="text-base font-bold text-[#599b9b]">前往商店</Link>
          </div>
        )
        : (
          <div className="md:mx-8">
            <ProductFilter
              onCategoryChange={handleChangeCategory}
              onSortChange={handleChangeSort}
            />
            <ProductList products={filterProducts} />
          </div>
        )
      )}
    </div>
  );
}
