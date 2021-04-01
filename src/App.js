import React from 'react';
import { Provider } from 'react-redux';
import Store from './app/store';
import { User } from './features/user/User';
import './App.css';

function App() {
  return (
    <Provider store={Store}>
      <User />
    </Provider>
  );
}

export default App;
