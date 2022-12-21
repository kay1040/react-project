import React from 'react';
import { useGetProductsQuery } from '../../store/api/productsApi';
import ProductList from '../ProductList/ProductList';
import Loading from '../UI/Loading/Loading';

function NewProducts() {
  const { data: products, isSuccess, isLoading } = useGetProductsQuery();

  let newProducts = products;
  // 取出陣列中倒數八個商品
  if (isSuccess) newProducts = products.slice(-8);

  return (
    <div className="max-w-screen-xl mx-auto my-8 md:my-16">
      {isLoading && <Loading />}
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
export default NewProducts;
