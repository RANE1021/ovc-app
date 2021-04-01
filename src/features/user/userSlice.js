import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  errors: false,
  users: [],
  showPosts: false,
  searchFilter: '',
  filteredUser: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: state => {
      state.loading = true
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload
      state.loading = false
      state.errors = false
    },
    getUsersFailure: state => {
      state.loading = false
      state.errors = true
    },
    getShowPosts: state => {
      state.showPosts = true
    },
    getFilter: (state, { payload }) => {
      state.searchFilter = payload
    },
    getFilteredUser: (state, { payload }) => {
      state.filteredUser = payload
    }
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  getShowPosts,
  getFilter,
  getFilteredUser
} = userSlice.actions;

export function fetchAllUsers() {
  return async dispatch => {
    dispatch(getUsers())
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await response.json()
      dispatch(getUsersSuccess(data))
    } catch (error) {
      dispatch(getUsersFailure())
    }
  }
}

export function searchUser(users, filter) {
  return async dispatch => {
    const newUsers = users.filter(user => (user.name.toLowerCase()).startsWith(filter))
    dispatch(getFilteredUser(newUsers));
  }
}

export default userSlice.reducer;

export const selectUsers = state => state.user;
