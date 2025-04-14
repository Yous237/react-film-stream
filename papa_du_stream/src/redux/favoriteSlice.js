import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { favorites: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.favorites.findIndex((m) => m.id === movie.id);

      index === -1 ? state.favorites.push(movie) : state.favorites.splice(index, 1);
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
