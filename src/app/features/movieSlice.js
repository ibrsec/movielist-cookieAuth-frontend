import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  movies: [],
  oneMovie: {},
  loading: false,
  error: false,
};

const movieSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchMovieStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchMoviesFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchMoviesSuccess: (state, { payload }) => {
      state.loading = false;
      state.movies = payload;
    },
    fetchOneMovieSuccess: (state, { payload }) => {
      state.loading = false;
      state.oneMovie = payload;
    },
    fetchMoviesSuccessWithOutpayload: (state) => {
      state.loading = false;
    },
    fetchMoviesLogout: (state) => {
      state.movies = [];
      state.oneMovie = {};
    },
  },
});



export const {fetchMovieStart,fetchMoviesFail,fetchMoviesSuccess,fetchOneMovieSuccess,fetchMoviesSuccessWithOutpayload,fetchMoviesLogout} = movieSlice.actions;
export default movieSlice.reducer;
