import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Posts } from '../posts/Posts';
import { fetchAllUsers, selectUsers, getShowPosts, getFilter, searchUser } from './userSlice';
import { fetchUserPosts } from '../posts/postSlice';
import styles from './User.module.css';

export function User() {
  const dispatch = useDispatch();
  const { users, showPosts, searchFilter, filteredUser } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch]);

  function handleOnClick(id) {
    dispatch(fetchUserPosts(id));
     dispatch(getShowPosts());
  };

  function handleOnChange(value) {
    dispatch(getFilter(value));
    dispatch(searchUser(users, searchFilter));
  }

  function renderRows() {
    if (searchFilter === "") {
      return users.map(user =>
      <tr key={user.id} onClick={() => handleOnClick(user.id)}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address.city}</td>
        <td>{user.company.name}</td>
      </tr>
      )
    }
    if (searchFilter !== "") {
      return filteredUser.map(user =>
      <tr key={user.id} onClick={() => handleOnClick(user.id)}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address.city}</td>
        <td>{user.company.name}</td>
      </tr>
      )
    }
  };

  return (
    <div className="container">
      <input
          className='User'
          type="text"
          placeholder="Search ..."
          onChange={ event => handleOnChange(event.target.value) }
           />
      <h2>Users</h2>
      <div className="table-center">
        <table id='users'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      </div>
      { showPosts ? <Posts /> : null }
    </div>
  );
};
