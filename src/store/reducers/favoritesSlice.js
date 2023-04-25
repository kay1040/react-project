import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritesList: JSON.parse(localStorage.getItem('favoritesList')) || [],
  },
  reducers: {
    addToFavoritesList(state, action) {
      const index = state.favoritesList.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.favoritesList.push(action.payload);
        localStorage.setItem('favoritesList', JSON.stringify(state.favoritesList));
      }
    },
    removeFromFavoritesList(state, action) {
      state.favoritesList.splice(state.favoritesList.findIndex((item) => item.id === action.payload.id), 1);
      localStorage.setItem('favoritesList', JSON.stringify(state.favoritesList));
    },
  },
});

export const { addToFavoritesList, removeFromFavoritesList } = favoritesSlice.actions;

export default favoritesSlice.reducer;
