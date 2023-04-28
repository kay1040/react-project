import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetProductsQuery } from '../store/api/productsApi';
import Loading from '../components/UI/Loading';
import ProductsFilter from '../components/Shop/ProductsFilter';
import ProductsList from '../components/Shop/ProductsList';

export default function ShopPage() {
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
  } = useGetProductsQuery();
  const [productsList, setProductsList] = useState(null);
  const location = useLocation();
  const [keyword, setKeyword] = useState(location.state?.keyword);

  useEffect(() => {
    if (keyword) {
      const filterProducts = products?.filter((item) => item.name.indexOf(keyword) !== -1);
      setProductsList(filterProducts);
    } else {
      setProductsList(products);
    }
  }, [isSuccess, products, keyword]);

  const handleChangeCategory = (newCategory) => {
    if (newCategory === '所有商品') {
      setProductsList(products);
    } else {
      const filterProducts = products?.filter((item) => item.category === newCategory);
      setProductsList(filterProducts);
    }
    if (keyword) setKeyword(null);
  };

  const handleChangeSort = (newSort) => {
    const sortProducts = [...productsList];
    switch (newSort) {
      case 'latest':
        sortProducts.sort((a, b) => b.id - a.id);
        setProductsList(sortProducts);
        break;
      case 'ascending':
        sortProducts.sort((a, b) => a.price - b.price);
        setProductsList(sortProducts);
        break;
      case 'descending':
        sortProducts.sort((a, b) => b.price - a.price);
        setProductsList(sortProducts);
        break;
      default:
        sortProducts.sort((a, b) => a.id - b.id);
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
            <ProductsFilter
              onCategoryChange={handleChangeCategory}
              onSortChange={handleChangeSort}
            />
            <ProductsList products={productsList} />
          </div>
        )
      )}
    </div>
  );
}
