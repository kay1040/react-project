import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../store/api/productsApi';
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
              <h2 className="text-center mb-0 mt-20">新品上架</h2>
              <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {newProducts.map((product) => (
                    <Link
                      to={`/shop/product/${product.id}`}
                      key={product.id}
                      className="group"
                    >
                      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={product.attributes.imgSrc}
                          alt={product.attributes.title}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">{product.attributes.title}</h3>
                      <p className="mt-1 text-base font-medium text-gray-900">
                        NT$
                        {product.attributes.price.toLocaleString('en-US')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </>
            )}
    </div>
  );
}
export default NewProducts;
