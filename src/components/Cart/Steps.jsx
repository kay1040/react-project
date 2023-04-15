import React, { useState } from 'react';
import {
  Form, message, Steps, ConfigProvider,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { clearCart } from '../../store/reducers/cartSlice';
import CheckoutForm from './CheckoutForm';
import Order from './Order';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../../store/api/authApi';

// 參考: https://stackoverflow.com/questions/68889542/ant-design-automatically-submit-form-inside-of-steps-before-going-to-next-step

export default function ShoppingSteps() {
  const [current, setCurrent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [newOrder, setNewOrder] = useState('');
  const [form] = Form.useForm();

  const cart = useSelector((state) => state.cart);
  const { data } = useGetUserDataQuery({}, { refetchOnMountOrArgChange: true });
  const [updateUserData] = useUpdateUserDataMutation();

  const dispatch = useDispatch();

  const createOrder = (orderNum) => {
    const order = {
      number: orderNum,
      items: cart.cartItems,
    };
    updateUserData({
      order: [order, ...(data?.order || [])],
    });
    setIsComplete(true);
    setNewOrder(order);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
        if (current === 1) {
          const orderNum = Date.now();
          createOrder(orderNum);
          dispatch(clearCart());
        }
      });
  };

  const steps = [
    {
      title: '確認購物車',
      content: <Cart />,
    },
    {
      title: '填寫收件者資料',
      content: <CheckoutForm form={form} />,
    },
    {
      title: '完成訂單',
      content: <Order newOrder={newOrder} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="max-w-screen-xl mx-auto my-16 md:my-24">
      {cart.cartItems.length === 0 && !isComplete
        ? (
          <div className="text-center text-base mt-28">
            <p className="mb-3">您的購物車內沒有商品</p>
            <Link to="/shop" className="font-bold text-[#599b9b]">立即選購</Link>
          </div>
        )
        : (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#2f4f4f',
              },
            }}
          >
            <Steps progressDot current={current} items={items} className="mx-auto w-4/5 md:w-3/5" />
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action flex justify-around">
              {current > 0 && (
                <button type="button" className="btn-primary text-sm font-bold px-4 py-1" onClick={handlePrev}>
                  上一步
                </button>
              )}

              {current === steps.length - 1 && (
                <button type="button" className="btn-primary text-sm font-bold px-4 py-1" onClick={() => { message.success('完成訂單!'); }}>
                  完成訂單
                </button>
              )}
              {current < steps.length - 1 && (
                <button type="button" className="btn-primary text-sm font-bold px-5 py-1" onClick={handleNext}>
                  下一步
                </button>
              )}
            </div>
          </ConfigProvider>
        )}
    </div>
  );
}
