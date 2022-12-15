import { Form, Input } from 'antd';
import React from 'react';
import './CheckoutForm.css';

const CheckoutForm = (props) => {
  const { Item } = Form;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Form form={props.form} >
        <Item name="name" label="姓名" rules={[{ required: true, message: "姓名不可為空" }]}>
          <Input />
        </Item>
        <Item name="phone" label="電話" rules={[{ required: true, message: "電話不可為空" }]}>
          <Input />
        </Item>
        <Item name="address" label="地址" rules={[{ required: true, message: "地址不可為空" }]}>
          <Input />
        </Item>
        <Item name="remark" label="備註">
          <Input.TextArea />
        </Item>
      </Form>
    </div>
  );
};

export default CheckoutForm;