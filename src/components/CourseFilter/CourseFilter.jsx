import React from 'react';

function CourseFilter(props) {
  const { onCategoryChange, category } = props;
  const changeHandler = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className="mx-6 md:mx-8">
      <span>類別：</span>
      <select value={category} onChange={changeHandler}>
        <option value="所有教學">所有教學</option>
        <option value="基本技法">基本技法</option>
        <option value="傳統款">傳統款</option>
      </select>
    </div>
  );
}

export default CourseFilter;
