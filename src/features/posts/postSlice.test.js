import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { selectUsers } from '../user/userSlice';
import reducer, { initialState, getPosts, getPostsSuccess, getPostsFailure, fetchUserPosts, selectPosts  } from './postSlice';
const fetchPosts: jest.Mock = require('./postSlice').fetchUserPosts;
import postResponse3 from '../../testResponses/postResponse3.json'
import postResponse7 from '../../testResponses/postResponse7.json'

const startingState = {
  loading: false,
  errors: false,
  posts: [],
}

describe('post slice', () => {
    const mockStore = configureMockStore([thunk]);

    describe('reducer, actions and selectors', () => {
        it('should return initial state upon starting', () => {
            const nextState = reducer(undefined, {});

            expect(nextState).toEqual(startingState);
        });
    })

    describe('thunks', () => {
        describe('fetchUserPosts()', () => {
            it('runs getPost at start and then getPostsSuccess with user Id=3 successful API call', async () => {
                const store = mockStore({post: initialState});

                const dispatch = jest.fn()
                await fetchPosts(3)(dispatch)

                const getPostResponse = {"payload": undefined, "type": "post/getPosts"}
                expect(dispatch).toHaveBeenCalledTimes(2)
                expect(dispatch).toHaveBeenCalledWith(getPostResponse);
                expect(dispatch).toHaveBeenCalledWith(getPostsSuccess(postResponse3));
            })
        })

            it('runs getPost at start and then getPostsSuccess with user Id=7 successful API call', async () => {
                const store = mockStore({post: initialState});

                const dispatch = jest.fn()
                await fetchPosts(7)(dispatch)

                const getPostResponse = {"payload": undefined, "type": "post/getPosts"}
                expect(dispatch).toHaveBeenCalledTimes(2)
                expect(dispatch).toHaveBeenCalledWith(getPostResponse);
                expect(dispatch).toHaveBeenCalledWith(getPostsSuccess(postResponse7));
            })
    })
})
