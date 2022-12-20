import React, { useState } from 'react';
import './Steps.css';
import {
  Form, Button, message, Steps,
} from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import Order from '../Order/Order';

// 參考: https://stackoverflow.com/questions/68889542/ant-design-automatically-submit-form-inside-of-steps-before-going-to-next-step

const { Step } = Steps;

function App() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const cart = useSelector((state) => state.cart);

  const buttonStyle = {
    margin: '0 8px',
    backgroundColor: 'darkslategray',
    border: 0,
    borderRadius: '6px',
    width: 100,
    height: 30,
    marginBottom: 100,
    color: '#fff',
  };

  const prevHandler = () => {
    setCurrent(current - 1);
  };

  const nextHandler = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
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

      content: <Order />,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto my-16 md:my-24">
      {cart.cartItems.length === 0
        ? (
          <div className="text-center text-base">
            <p className="mb-3">您的購物車內沒有商品</p>
            <Link to="/shop" className="font-bold text-[#599b9b]">立即選購</Link>
          </div>
        )
        : (
          <>
            <Steps current={current} style={{ margin: '0 auto', width: '60%' }}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action flex justify-around">
              {current > 0 && (
              <Button style={buttonStyle} onClick={prevHandler}>
                上一步
              </Button>
              )}

              {current === steps.length - 1 && (
              <Button type="primary" style={buttonStyle} onClick={() => message.success('完成訂單!')}>
                完成訂單
              </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" style={buttonStyle} onClick={nextHandler} htmlType="submit">
                  下一步
                </Button>
              )}
            </div>
          </>
        )}
    </div>
  );
}

export default App;
