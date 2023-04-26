import { Form, Input } from 'antd';
import React from 'react';
import './CheckoutForm.css';

export default function CheckoutForm({ form }) {
  const { Item } = Form;
  const nameRules = [{ required: true, message: '姓名不可為空' }];
  const phoneRules = [
    { required: true, message: '電話不可為空' },
    { pattern: /^09[0-9]{8}$/, message: '請輸入正確的手機號碼' },
  ];
  const addressRules = [{ required: true, message: '地址不可為空' }];

  return (
    <div className="flex justify-center">
      <Form form={form}>
        <Item name="name" label="姓名" rules={nameRules}>
          <Input />
        </Item>
        <Item name="phone" label="電話" rules={phoneRules}>
          <Input />
        </Item>
        <Item name="address" label="地址" rules={addressRules}>
          <Input />
        </Item>
        <Item name="remark" label="備註">
          <Input.TextArea />
        </Item>
      </Form>
    </div>
  );
}
