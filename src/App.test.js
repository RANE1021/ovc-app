import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import { User } from './features/user/User';

describe('App Component', () => {
 it('should render without throwing an error', () => {
     jest.mock('react-redux', () => {
    const ActualReactRedux = require.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useSelector: jest.fn().mockImplementation(() => {
            return mockState;
        }),
    };
});
 })
})
