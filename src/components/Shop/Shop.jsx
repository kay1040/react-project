import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductFilter from '../ProductFilter/ProductFilter';

import { useGetProductsQuery } from '../../store/api/productsApi';
import Loading from '../UI/Loading/Loading';

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
    <div className="max-w-screen-xl mx-auto my-8 md:my-16">
      {isLoading && <div className="my-48"><Loading /></div>}
      {isSuccess && (filterProducts.length === 0
        ? (
          <div className="mt-24 text-center">
            <p className="text-lg mb-3">查無此商品</p>
            <Link to="/shop" className="text-base font-bold text-[#599b9b]">前往商店</Link>
          </div>
        )
        : (
          <>
            <ProductFilter
              onCategoryChange={changeCategoryHandler}
              onSortChange={changeSortHandler}
            />
            <div className="bg-white">
              <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {filterProducts.map((product) => (
                    <Link
                      to={`/shop/product/${product.id}`}
                      key={product.id}
                      className="group"
                    >
                      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={product.attributes.imgSrc}
                          className="h-full w-full object-cover object-center group-hover:opacity-75 hover:scale-105"
                          alt={product.attributes.title}
                        />
                      </div>
                      <h3 className="mt-3 text-sm text-gray-700">{product.attributes.title}</h3>
                      <p className="mt-2 text-base font-medium text-gray-900">
                        NT$
                        {product.attributes.price.toLocaleString('en-US')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
export default Shop;
