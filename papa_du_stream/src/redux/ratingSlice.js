import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ratings: [],
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    toggleRating: (state, action) => {
      const { movieId, movieData, note } = action.payload;
      const existingIndex = state.ratings.findIndex(r => r.movieId === movieId);
      if (existingIndex !== -1) {
        state.ratings[existingIndex].note = note;
      } else {
        state.ratings.push({ movieId, movieData, note });
      }
    },
  },
});

export const { toggleRating } = ratingSlice.actions;
export default ratingSlice.reducer;
