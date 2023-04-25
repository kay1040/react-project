import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductsList(props) {
  const { products } = props;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-6 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Link
              to={`/shop/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.imgPath}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 hover:scale-105"
                  alt={product.name}
                />
              </div>
              <h3 className="mt-3 text-sm text-gray-700">{product.name}</h3>
              <p className="text-base font-bold text-gray-900 before:content-['NT$']">
                {product.price.toLocaleString('en-US')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
