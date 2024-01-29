import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      const temp = state.list.filter((item) => item._id !== action.payload);
      state.list = temp;
    },
    resetList: (state, action) => {
      state.list = [];
    },
  },
});
export const { addToFavorite, removeFromFavorite, resetList } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
