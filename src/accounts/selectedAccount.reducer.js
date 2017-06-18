import _ from 'lodash';
const log = console.log;

export const selectAccount = (state, action)=>
{
    return action.accountID;
};

export const selectedAccount = (state=null, action)=>
{
  switch(action.type)
  {
    case 'SELECT_ACCOUNT': return selectAccount(state, action);
    default: return state;
  }
}