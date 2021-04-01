import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { initialState, getUsers, getUsersSuccess, getUsersFailure, getShowPosts, getFilter, getFilteredUser, fetchAllUsers } from './userSlice';
const fetchUsers: jest.Mock = require('./userSlice').fetchAllUsers;
const search: jest.Mock = require('./userSlice').searchUser;
import userResponse from '../../testResponses/userResponse.json'

const startingState = {
  loading: false,
  errors: false,
  users: [],
  showPosts: false,
  searchFilter: '',
  filteredUser: [],
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
        describe('fetchAllUsers()', () => {
            it('runs getUsers at start and then getUsersSuccess with successful API call', async () => {
                const store = mockStore({user: initialState});

                const dispatch = jest.fn()
                await fetchUsers()(dispatch)

                const getUserResponse = {"payload": undefined, "type": "user/getUsers"}
                expect(dispatch).toHaveBeenCalledTimes(2)
                expect(dispatch).toHaveBeenCalledWith(getUserResponse);
                expect(dispatch).toHaveBeenCalledWith(getUsersSuccess(userResponse));
            })
        })

        describe('searchUsers()', () => {
            it('uns getUsers at start and then getUsersSuccess with successful API call', async () => {
                const store = mockStore({user: initialState});

                const dispatch = jest.fn()
                const filterUser = "lea"
                await search(userResponse, filterUser)(dispatch)

                expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
                    "payload": expect.arrayContaining([expect.objectContaining({"name": "Leanne Graham"})])
                }));
            })
        })
    })
})
