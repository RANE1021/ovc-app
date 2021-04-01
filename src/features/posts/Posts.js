import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts } from './postSlice';
import styles from './Posts.module.css';

export function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);

   function renderRows() {
    return posts.map(post =>
      <tr key={post.id}>
        <td className="td-title">{post.title}</td>
        <td className="td-body">{post.body}</td>
      </tr>
    )
  };

  return (
    <div className="post-table">
      <h2>Posts</h2>
      <table id='posts'>
        <thead>
          <tr>
            <th className="td-title">Title</th>
            <th className="td-body">Body</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};
