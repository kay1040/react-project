import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductFilter from '../ProductFilter/ProductFilter';
import { useGetProductsQuery } from '../../store/api/productsApi';
import Loading from '../UI/Loading/Loading';
import ProductList from '../ProductList/ProductList';

function Shop() {
  const { data: products, isSuccess, isLoading } = useGetProductsQuery();
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

  const changeCategoryHandler = (newCategory) => {
    setCategory(newCategory);
  };
  const changeSortHandler = (newSort) => {
    setSort(newSort);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-6 md:mt-8 mb-8 md:mb-16">
      {isLoading && <div className="my-48"><Loading /></div>}
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
              onCategoryChange={changeCategoryHandler}
              onSortChange={changeSortHandler}
            />
            <ProductList products={filterProducts} />
          </div>
        )
      )}
    </div>
  );
}
export default Shop;
