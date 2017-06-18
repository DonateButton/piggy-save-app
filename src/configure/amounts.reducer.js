import _ from 'lodash';
import { guid } from './guid';

const log = console.log;


export const addAmount = (state, action)=>
{
    return [...state, action.amount];
};

export const addAmounts = (state, action)=>
{
    return [...state, ...action.amounts];
};

export const findAmountIndex = (state, action)=>
{
    return _.findIndex(state, item => item.id === action.amount.id);
};

export const removeAmount = (state, action)=>
{
    const index = findAmountIndex(state, action);
    if(index < 0)
    {
        return state;
    }
    return [
        ...state.slice(0, index), 
	    ...state.slice(index + 1)
    ];
};

const defaultAmounts = [
    {id: guid(), total: 1, amountDisplay: "$1.00"},
    {id: guid(), total: 5, amountDisplay: "$5.00"},
    {id: guid(), total: 15, amountDisplay: "$15.00"},
    {id: guid(), total: 0, amountDisplay: "Other Amount"}
];

export const amounts = (state=defaultAmounts, action)=>
{
  switch(action.type)
  {
    case 'ADD_AMOUNT': return addAmount(state, action);
    case 'REMOVE_AMOUNT': return removeAmount(state, action);
    default: return state;
  }
}