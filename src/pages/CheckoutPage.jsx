import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  doc,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Form, Steps, ConfigProvider,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, saveCartData } from '../store/reducers/cartSlice';
import Cart from '../components/Checkout/Cart';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import OrderConfirmation from '../components/Checkout/OrderConfirmation';
import { db } from '../firebaseConfig';
import useAuth from '../hooks/useAuth';
import Message from '../components/UI/Message';

export default function CheckoutPage() {
  const [current, setCurrent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [newOrder, setNewOrder] = useState(null);
  const [form] = Form.useForm();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
        navigate(`/user/orders/${newOrder.orderNumber}`);
      }, 2000);
    }
  }, [message]);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => () => {
    if (currentUser?.uid) dispatch(saveCartData(currentUser.uid));
  }, [currentUser, dispatch, cart]);

  const getOrderNumber = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(
      ordersRef,
      where('orderNumber', '>=', `${dateStr}0001`),
      orderBy('orderNumber', 'desc'),
      limit(1),
    );
    const querySnapshot = await getDocs(ordersQuery);
    const newOrderNumber = querySnapshot.size > 0
      ? (+querySnapshot.docs[0].data().orderNumber + 1).toString()
      : `${dateStr}0001`;
    return newOrderNumber;
  };

  const createOrder = async (orderNumber, values) => {
    const {
      name,
      address,
      phone,
      remark,
    } = values;
    const order = {
      uid: currentUser.uid,
      orderNumber,
      items: cart,
      state: '訂單成立',
      createdAt: serverTimestamp(),
      recipientData: {
        name,
        address,
        phone,
        remark: remark ?? '',
      },
    };
    setNewOrder(order);
  };

  const completeOrder = async () => {
    setDoc(doc(db, 'orders', newOrder.orderNumber), newOrder);
    setIsComplete(true);
    dispatch(clearCart());
    setMessage('訂單已送出');
  };

  const handlePrev = () => {
    setCurrent((prevCurrent) => prevCurrent - 1);
  };

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        setCurrent((prevCurrent) => prevCurrent + 1);
        if (current === 1) {
          getOrderNumber().then((orderNumber) => {
            createOrder(orderNumber, values);
          });
        }
      });
  };

  const steps = [
    {
      title: '購物車',
      content: <Cart cart={cart} />,
    },
    {
      title: '收件資訊',
      content: <CheckoutForm form={form} />,
    },
    {
      title: '訂單確認',
      content: <OrderConfirmation newOrder={newOrder} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      {message && <Message message={message} />}
      <div className="max-w-screen-xl mx-auto my-8 md:my-24">
        {cart?.cartItems?.length === 0 && !isComplete
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
                  <button type="button" className="btn-primary text-sm font-bold px-4 py-1" onClick={completeOrder}>
                    送出訂單
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
    </>
  );
}
