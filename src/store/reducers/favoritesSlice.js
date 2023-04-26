import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export const savefavoritesList = createAsyncThunk(
  'favorites/savefavoritesList',
  async ([favoritesList, userId]) => {
    try {
      const db = getFirestore();
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { favoritesList });
    } catch (error) {
      return { error };
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favoritesList')) || [],
  reducers: {
    addToFavoritesList(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
        localStorage.setItem('favoritesList', JSON.stringify(state));
      }
    },
    removeFromFavoritesList(state, action) {
      state.splice(state.findIndex((item) => item.id === action.payload.id), 1);
      localStorage.setItem('favoritesList', JSON.stringify(state));
    },
    updateFavoritesList(state, action) {
      return action.payload;
    }
  },
});

export const {
  addToFavoritesList,
  removeFromFavoritesList,
  updateFavoritesList,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
