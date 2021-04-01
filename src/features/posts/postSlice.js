import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  errors: false,
  posts: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPosts: state => {
      state.loading = true
    },
    getPostsSuccess: (state, { payload }) => {
      state.posts = payload
      state.loading = false
      state.errors = false
    },
    getPostsFailure: state => {
      state.loading = false
      state.errors = true
    }
  },
});

export const { getPosts, getPostsSuccess, getPostsFailure } = postSlice.actions;

export const fetchUserPosts = (userId) => {
  return async dispatch => {
    dispatch(getPosts())

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
      const data = await response.json()

      dispatch(getPostsSuccess(data))
    } catch (error) {
      dispatch(getPostsFailure())
    }
  }
}

export default postSlice.reducer;

export const selectPosts = state => state.post;
