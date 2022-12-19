import { createSlice } from '@reduxjs/toolkit';

// 參考
// https://github.com/chaoocharles/complete-shopping-cart/blob/main/frontend/src/slices/cartSlice.js
// https://github.com/LloydJanseVanRensburg/ShoppingCart-Redux/blob/master/src/redux/Shopping/shopping-reducer.js
// https://github.com/Jon-Peppinck/amazon-clone
// https://so.muouseo.com/qa/el0krye3p6o3.html

// addToCart: https://stackoverflow.com/questions/71596790/adding-item-to-cart

const cartData = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cartData')) || cartData,
  reducers: {
    // 新增商品到購物車
    addToCart(state, action) {
      const data = state;
      // 取得商品索引號
      const index = state.cartItems.findIndex((item) => item.id === action.payload[0].id);
      const newItem = action.payload[0];
      const count = action.payload[1];
      // 若購物車中無此商品
      if (index === -1) {
        // 添加商品到購物車
        data.cartItems.push({
          ...newItem,
          quantity: count,
          subtotal: newItem.attributes.price * count,
        });
      // 若購物車中有此商品
      } else {
        // 修改已有商品的數量和小計
        data.cartItems[index].quantity += count;
        data.cartItems[index].subtotal += newItem.attributes.price * count;
      }
      // 計算總數和總額
      data.totalQuantity += count;
      data.totalAmount += newItem.attributes.price * count;
      // 將購物車資料儲存到本地
      localStorage.setItem('cartData', JSON.stringify(data));
    },
    // 增加購物車中商品數量
    increaseItem(state, action) {
      const data = state;
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      data.cartItems[index].quantity += 1;
      data.cartItems[index].subtotal = data.cartItems[index].attributes.price * data.cartItems[index].quantity;
      data.totalQuantity += 1;
      data.totalAmount += data.cartItems[index].attributes.price;
      localStorage.setItem('cartData', JSON.stringify(data));
    },
    // 減少購物車中商品數量
    decreaseItem(state, action) {
      const data = state;
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      data.cartItems[index].quantity -= 1;
      data.cartItems[index].subtotal = data.cartItems[index].attributes.price * data.cartItems[index].quantity;
      data.totalQuantity -= 1;
      data.totalAmount -= data.cartItems[index].attributes.price;
      localStorage.setItem('cartData', JSON.stringify(data));
      // 數量歸零移除商品
      if (data.cartItems[index].quantity === 0) {
        data.cartItems.splice(data.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      }
      localStorage.setItem('cartData', JSON.stringify(data));
    },
    // 設定Input值給商品數量
    getInputValue(state, action) {
      const data = state;
      const index = state.cartItems.findIndex((item) => item.id === action.payload[0].id);
      const input = action.payload[1];
      data.totalQuantity = data.totalQuantity - data.cartItems[index].quantity + input;
      data.cartItems[index].quantity = input;
      data.totalAmount = data.totalAmount - data.cartItems[index].subtotal + data.cartItems[index].attributes.price * data.cartItems[index].quantity;
      data.cartItems[index].subtotal = data.cartItems[index].attributes.price * data.cartItems[index].quantity;
      localStorage.setItem('cartData', JSON.stringify(data));
      // 數量歸零移除商品
      if (data.cartItems[index].quantity === 0) {
        data.cartItems.splice(data.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      }
      localStorage.setItem('cartData', JSON.stringify(data));
    },
    // 移除購物車中商品
    removeItem(state, action) {
      const data = state;
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      data.totalQuantity -= data.cartItems[index].quantity;
      data.totalAmount -= data.cartItems[index].subtotal;
      data.cartItems.splice(data.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      localStorage.setItem('cartData', JSON.stringify(data));
    },
    // 清空購物車
    clearCart(state) {
      const data = state;
      data.cartItems = [];
      data.totalQuantity = 0;
      data.totalAmount = 0;
      localStorage.setItem('cartData', JSON.stringify(data));
    },
  },
});

export const {
  addToCart, increaseItem, decreaseItem, getInputValue, removeItem, clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
