import _ from 'lodash';
import { guid } from './guid';

const log = console.log;


export const selectAmount = (state, action) =>
{
   return Object.assign({}, state, {
       selectedAmount: action.amount
   });
};

export const chooseAmount = (state, action) =>
{
    return Object.assign({}, state, {
       chosenAmount: state.selectedAmount
   });
};

const defaultChosenAmounts = {
    selectedAmount: null,
    chosenAmount: null
};

export const chosenAmounts = (state=defaultChosenAmounts, action)=>
{
  switch(action.type)
  {
    case 'SELECTED_AMOUNT': return selectAmount(state, action);
    case 'CHOOSE_AMOUNT': return chooseAmount(state, action);
    default: return state;
  }
}