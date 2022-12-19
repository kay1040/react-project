import React from 'react';

function ProductFilter(props) {
  const { onCategoryChange, onSortChange } = props;
  const categoryFilterHandler = (e) => {
    onCategoryChange(e.target.value);
  };

  const sortChangeHandler = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="max-w-screen-xl mx-auto text-left flex justify-between items-start">
      <div className="mx-6 md:mx-8">
        <span>篩選：</span>
        <select onChange={categoryFilterHandler}>
          <option value="所有商品">所有商品</option>
          <option value="閩南傳統12款">傳統款</option>
          <option value="創作款">創作款</option>
        </select>
      </div>
      <div className="mx-6 md:mx-8">
        <span>排序：</span>
        <select onChange={sortChangeHandler}>
          <option value="sort">上架順序</option>
          <option value="ascending">價格低到高</option>
          <option value="descending">價格高到低</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilter;
