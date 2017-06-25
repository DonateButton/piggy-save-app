import _ from 'lodash';
const log = console.log;

export const LOADING_ACCOUNTS = 'LOADING_ACCOUNTS';
export const ACCOUNTS_LOAD_SUCCESS = 'ACCOUNTS_LOAD_SUCCESS';
export const ACCOUNTS_LOAD_FAILURE = 'ACCOUNTS_LOAD_FAILURE';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_ACCOUNTS = 'ADD_ACCOUNTS';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export const loadingAccounts = (state, action)=>
{
    return Object.assign({}, state, {
        loading: true,
        error: false,
        errorString: null
    });
};

export const accountsLoadSuccess = (state, action)=>
{
    return Object.assign({}, state, {
        loading: false,
        error: false,
        errorString: null
    });
};

export const accountsLoadFailure = (state, action)=>
{
    return Object.assign({}, state, {
        loading: false,
        error: true,
        errorString: action.errorString
    });
};

export const addAccount = (state, action)=>
{
    return Object.assign({}, state, {
        accounts: [...state, action.account]
    });
};

export const addAccounts = (state, action)=>
{
    return Object.assign({}, state, {
        accounts: [...state, ...action.accounts]
    });
};

export const findAccountIndex = (state, action)=>
{
    return _.findIndex(state.accounts, item => item.id === action.account.id);
};

export const removeAccount = (state, action)=>
{
    const index = findAccountIndex(state, action);
    if(index < 0)
    {
        return state;
    }
    return Object.assign({}, state, {
        accounts: [
            ...state.slice(0, index), 
            ...state.slice(index + 1)
        ]
    });
};

export const defaultState = {
    accounts: [],
    loading: false,
    error: false,
    errorString: null
};
export const accounts = (state=defaultState, action)=>
{
  switch(action.type)
  {
    case LOADING_ACCOUNTS: return loadingAccounts(state, action);
    case ACCOUNTS_LOAD_FAILURE: return accountsLoadFailure(state, action);
    case ACCOUNTS_LOAD_SUCCESS: return accountsLoadSuccess(state, action);
    case ADD_ACCOUNT: return addAccount(state, action);
    case ADD_ACCOUNTS: return addAccounts(state, action);
    case REMOVE_ACCOUNT: return removeAccount(state, action);
    default: return state;
  }
}