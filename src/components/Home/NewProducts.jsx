import React from 'react';
import { useGetProductsQuery } from '../../store/api/productsApi';
import ProductList from '../Shop/ProductList';
import Loading from '../UI/Loading';

export default function NewProducts() {
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
  } = useGetProductsQuery();

  let newProducts = products;
  // 取出陣列中倒數八個商品
  if (isSuccess) newProducts = products.slice(-8);

  return (
    <div className="max-w-screen-xl mx-auto my-8 md:my-16">
      {isLoading && <Loading />}
      {isError && <div className="text-lg mb-3 text-center">商品資料載入失敗</div>}
      {isSuccess
        && (
          <>
            <h2 className="text-center mb-0 mt-12">新品上架</h2>
            <ProductList products={newProducts} />
          </>
        )}
    </div>
  );
}
