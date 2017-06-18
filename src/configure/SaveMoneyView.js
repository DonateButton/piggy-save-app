import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux'

const log = console.log;

const getPayToTextFromAccount = account =>
{
  const mapped = {
    checking: 'Pay From:',
    savings: 'Pay To:'
  };
  return mapped[account.type];
}

const accountsToList = (accounts, onAccountClick) =>
{
  return accounts.map(account =>
  {
    const accountName = account.name;
    const payToText = getPayToTextFromAccount(account);
    return <ListItem key={account.id} 
      onClick={() => onAccountClick(account.id)}
      primaryText={payToText}
      secondaryText={accountName} />;
  });
};

export const SaveMoneyView = ({accounts, onAccountClick}) => (
  <div>
    <List>
    {accountsToList(accounts, onAccountClick)}
    </List>
    <ListItem primaryText='Account:' secondaryText='Choose Amount:' />
    <div className="centerInRow">
      <span className="flexGrow1">&nbsp;</span>
      <RaisedButton className="flexGrow2">Slide To Setup &gt;</RaisedButton>
      <span className="flexGrow1">&nbsp;</span>
    </div>
  </div>
)

const mapStateToProps = state =>
{
  return {
    accounts: state.accounts
  };
};
const mapDispatchToProps = dispatch =>
{
  console.log("mapDispatchToProps:", dispatch);
  return {
    onAccountClick: (id) => {
      // dispatch({type: 'SELECT_ACCOUNT', accountID: id});
      log("sup:", id);
    }
  }
};

export const SaveMoneyViewRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveMoneyView);