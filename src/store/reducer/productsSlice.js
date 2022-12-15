import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
    },
    reducers: {
        addToFavoriteList(state, action){
            const index = state.favoriteList.findIndex((item) => item.id === action.payload.id);
            if (index === -1){
                state.favoriteList.push(action.payload);
                localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList));
            } 
        },
        removeFromFavoriteList(state, action){
            state.favoriteList.splice(state.favoriteList.findIndex((item) => item.id === action.payload.id), 1);
            localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList));
        },
    }
});

export const { addToFavoriteList, removeFromFavoriteList } = productsSlice.actions;

export default productsSlice.reducer;