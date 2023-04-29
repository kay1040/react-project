import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export const saveFavoritesList = createAsyncThunk(
  'favorites/saveFavoritesList',
  async (uid, { getState }) => {
    try {
      const favoritesList = getState().favorites;
      const db = getFirestore();
      const userDoc = doc(db, 'users', uid);
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
    clearFavoritesList() {
      localStorage.setItem('favoritesList', JSON.stringify([]));
    },
    mergeFavoritesList(state, action) {
      const firebaseFavoritesList = [...action.payload];
      firebaseFavoritesList.forEach((favoriteItem) => {
        const index = state.findIndex((item) => item.id === favoriteItem.id);
        if (index === -1) {
          state.push(favoriteItem);
        }
      });
      localStorage.setItem('favoritesList', JSON.stringify(state));
    },
  },
});

export const {
  addToFavoritesList,
  removeFromFavoritesList,
  clearFavoritesList,
  mergeFavoritesList,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
