import React from 'react';
import { useGetUserDataQuery } from '../../store/api/authApi';

export default function MyOrder() {
  const { data, isSuccess } = useGetUserDataQuery();

  return (
    <div className="mx-auto mb-24 w-11/12 md:w-9/12 border border-slate-200 rounded rounded-tl-none p-8">
      {isSuccess
        ? (
          <div>
            訂單號碼：
            {data.order[0].number}
          </div>
        )
        : (<div>尚無訂單</div>)}
    </div>
  );
}
