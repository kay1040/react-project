import React from 'react';

export default function ProductsFilter(props) {
  const { onCategoryChange, onSortChange } = props;
  const handleCategoryFilter = (e) => {
    onCategoryChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="max-w-screen-xl mx-auto text-left flex justify-between items-start text-sm">
      <div className="mx-6 md:mx-8">
        <span>篩選：</span>
        <select onChange={handleCategoryFilter}>
          <option value="所有商品">所有商品</option>
          <option value="傳統款">傳統款</option>
          <option value="創作款">創作款</option>
        </select>
      </div>
      <div className="mx-6 md:mx-8">
        <span>排序：</span>
        <select onChange={handleSortChange}>
          <option value="default">預設</option>
          <option value="latest">最新上架</option>
          <option value="ascending">價格低到高</option>
          <option value="descending">價格高到低</option>
        </select>
      </div>
    </div>
  );
}
