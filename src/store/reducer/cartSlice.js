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
    addToCart(state, action) {
      // 取得商品索引號
      const index = state.cartItems.findIndex((item) => item.id === action.payload[0].id);
      const newItem = action.payload[0];
      const count = action.payload[1];
      // 若購物車中無此商品
      if (index === -1) {
        // 添加商品到購物車
        state.cartItems.push({
          ...newItem,
          quantity: count,
          subtotal: newItem.attributes.price * count,
        });
      // 若購物車中有此商品
      } else {
        // 修改已有商品的數量和小計
        state.cartItems[index].quantity += count;
        state.cartItems[index].subtotal += newItem.attributes.price * count;
      }
      // 計算總數和總額
      state.totalQuantity += count;
      state.totalAmount += newItem.attributes.price * count;
      // 將購物車資料儲存到本地
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 增加購物車中商品數量
    increaseItem(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.cartItems[index].quantity += 1;
      state.cartItems[index].subtotal = state.cartItems[index].attributes.price * state.cartItems[index].quantity;
      state.totalQuantity += 1;
      state.totalAmount += state.cartItems[index].attributes.price;
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 減少購物車中商品數量
    decreaseItem(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.cartItems[index].quantity -= 1;
      state.cartItems[index].subtotal = state.cartItems[index].attributes.price * state.cartItems[index].quantity;
      state.totalQuantity -= 1;
      state.totalAmount -= state.cartItems[index].attributes.price;
      localStorage.setItem('cartData', JSON.stringify(state));
      // 數量歸零移除商品
      if (state.cartItems[index].quantity === 0) {
        state.cartItems.splice(state.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      }
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 設定Input值給商品數量
    getInputValue(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload[0].id);
      const input = action.payload[1];
      state.totalQuantity = state.totalQuantity - state.cartItems[index].quantity + input;
      state.cartItems[index].quantity = input;
      state.totalAmount = state.totalAmount - state.cartItems[index].subtotal + state.cartItems[index].attributes.price * state.cartItems[index].quantity;
      state.cartItems[index].subtotal = state.cartItems[index].attributes.price * state.cartItems[index].quantity;
      localStorage.setItem('cartData', JSON.stringify(state));
      // 數量歸零移除商品
      if (state.cartItems[index].quantity === 0) {
        state.cartItems.splice(state.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      }
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 移除購物車中商品
    removeItem(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.totalQuantity -= state.cartItems[index].quantity;
      state.totalAmount -= state.cartItems[index].subtotal;
      state.cartItems.splice(state.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 清空購物車
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.setItem('cartData', JSON.stringify(state));
    },
  },
});

export const {
  addToCart, increaseItem, decreaseItem, getInputValue, removeItem, clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
