import React from 'react';
// import AccountItem from './AccountItem';

const accountsToList = (accounts, onAccountClick) =>
{
  console.log("accounts:", accounts);
  console.log("onAccountClick:", onAccountClick);
  return accounts.map(account =>
  {
    const accountName = account.name;
    return <div key={account.id} onClick={() => onAccountClick(account.id)}>{accountName}</div>;
  });
};
const AccountList = ({accounts, onAccountClick}) => (
  <ul>
    {accountsToList(accounts, onAccountClick)}
    </ul>
)

export default AccountList;