import _ from 'lodash';
const log = console.log;

export const LOGIN_START   = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT        = 'LOGOUT';

export const loginStart = (state, action)=>
{
    return Object.assign({}, state, {
        loggedIn: false,
        loading: true,
        error: undefined,
        loginError: false
    });
};

export const loginFailure = (state, action)=>
{
    return Object.assign({}, state, {
        loggedIn: false,
        loading: false,
        error: action.error,
        loginError: true
    });
};

export const loginSuccess = (state, action)=>
{
    return Object.assign({}, state, {
        loggedIn: true,
        loading: false,
        error: undefined,
        loginError: false,
        user: action.user
    });
};

export const logoutUser = (state, action) =>
{
    return Object.assign({}, state, {
        loggedIn: false,
        loading: false,
        error: undefined,
        loginError: false,
        user: undefined
    });
};

export const defaultState = {
    loggedIn: false,
    loading: false,
    error: undefined,
    loginError: false,
    user: undefined
};

export const login = (state=defaultState, action)=>
{
  switch(action.type)
  {
    case LOGIN_START: return loginStart(state, action);
    case LOGIN_FAILURE: return loginFailure(state, action);
    case LOGIN_SUCCESS: return loginSuccess(state, action);
    case LOGOUT: return logoutUser(state, action);
    default: return state;
  }
};