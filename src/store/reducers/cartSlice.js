import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const initialState = JSON.parse(localStorage.getItem('cartData')) || {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const saveCartData = createAsyncThunk(
  'cart/saveCartData',
  async (uid, { getState }) => {
    try {
      const cartData = getState().cart;
      const db = getFirestore();
      const userDoc = doc(db, 'users', uid);
      await updateDoc(userDoc, { cartData });
      return cartData;
    } catch (error) {
      return error;
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
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
          subtotal: newItem.price * count,
        });
        // 若購物車中有此商品
      } else {
        // 修改已有商品的數量和小計
        state.cartItems[index].quantity += count;
        state.cartItems[index].subtotal += newItem.price * count;
      }
      // 計算總數和總額
      state.totalQuantity += count;
      state.totalAmount += newItem.price * count;
      // 將購物車資料儲存到本地
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 增加購物車中商品數量
    increaseItem(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.cartItems[index].quantity += 1;
      state.cartItems[index].subtotal = state.cartItems[index].price * state.cartItems[index].quantity;
      state.totalQuantity += 1;
      state.totalAmount += state.cartItems[index].price;
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 減少購物車中商品數量
    decreaseItem(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.cartItems[index].quantity -= 1;
      state.cartItems[index].subtotal = state.cartItems[index].price * state.cartItems[index].quantity;
      state.totalQuantity -= 1;
      state.totalAmount -= state.cartItems[index].price;
      localStorage.setItem('cartData', JSON.stringify(state));
      // 數量歸零移除商品
      // if (state.cartItems[index].quantity === 0) {
      //   state.cartItems.splice(state.cartItems.findIndex((item) => item.id === action.payload.id), 1);
      // }
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 設定Input值給商品數量
    getInputValue(state, action) {
      const index = state.cartItems.findIndex((item) => item.id === action.payload[0].id);
      const input = action.payload[1];
      state.totalQuantity = state.totalQuantity - state.cartItems[index].quantity + input;
      state.cartItems[index].quantity = input;
      state.totalAmount = state.totalAmount - state.cartItems[index].subtotal
      + state.cartItems[index].price * state.cartItems[index].quantity;
      state.cartItems[index].subtotal = state.cartItems[index].price * state.cartItems[index].quantity;
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
    // 合併購物車
    mergeCartData(state, action) {
      const mergedCartData = { ...action.payload };
      state.cartItems.forEach((cartItem) => {
        const index = mergedCartData.cartItems.findIndex((item) => item.id === cartItem.id);
        if (index === -1) {
          mergedCartData.cartItems.push(cartItem);
        } else {
          mergedCartData.cartItems[index].quantity += cartItem.quantity;
          mergedCartData.cartItems[index].subtotal += cartItem.subtotal;
        }
      });
      state.cartItems = mergedCartData.cartItems;
      state.totalAmount += mergedCartData.totalAmount;
      state.totalQuantity += mergedCartData.totalQuantity;
    },
  },
});

export const {
  addToCart,
  increaseItem,
  decreaseItem,
  getInputValue,
  removeItem,
  clearCart,
  mergeCartData,
} = cartSlice.actions;

export default cartSlice.reducer;
