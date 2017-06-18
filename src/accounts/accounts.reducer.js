import _ from 'lodash';
const log = console.log;

export const addAccount = (state, action)=>
{
    return [...state, action.account];
};

export const addAccounts = (state, action)=>
{
    log("action:", action);
    return [...state, ...action.accounts];
};

export const findAccountIndex = (state, action)=>
{
    return _.findIndex(state, item => item.id === action.account.id);
};

export const removeAccount = (state, action)=>
{
    const index = findAccountIndex(state, action);
    if(index < 0)
    {
        return state;
    }
    return [
        ...state.slice(0, index), 
	    ...state.slice(index + 1)
    ];
};

export const accounts = (state=[], action)=>
{
  switch(action.type)
  {
    case 'ADD_ACCOUNT': return addAccount(state, action);
    case 'ADD_ACCOUNTS': return addAccounts(state, action);
    case 'REMOVE_ACCOUNT': return removeAccount(state, action);
    default: return state;
  }
}