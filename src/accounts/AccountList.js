import React from 'react';
import {List, ListItem} from 'material-ui/List';

const accountsToList = (accounts, onAccountClick) =>
{
  // console.log("accountsToList::accounts:", accounts);
  // console.log("accountsToList::onAccountClick:", onAccountClick);
  return accounts.map(account =>
  {
    const accountName = account.name;
    return <ListItem key={account.id} 
      onClick={() => onAccountClick(account.id)}
      primaryText={accountName} />;
  });
};
const AccountList = ({accounts, onAccountClick}) => (
  <div>
  <h1>Accounts:</h1>
  <List>
    {accountsToList(accounts, onAccountClick)}
    </List>
  </div>
)

export default AccountList;