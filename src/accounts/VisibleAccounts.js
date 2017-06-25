import React, { Component } from 'react';
import { connect } from 'react-redux'
import AccountList from './AccountList';
import _ from 'lodash';
import {
    LOADING_ACCOUNTS,
    ACCOUNTS_LOAD_SUCCESS,
    ACCOUNTS_LOAD_FAILURE,
    ADD_ACCOUNTS
} from './accounts.reducer';
import CircularProgress from 'material-ui/CircularProgress';

const log = console.log;

const mapStateToProps = state => {
    // console.log("VisibleAccounts::mapStateToProps, state:", state.accounts);
    return {
        accounts: _.get(state, 'accounts')
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadingAcounts: () => dispatch({ type: LOADING_ACCOUNTS }),
        accountsLoadSuccess: () => dispatch({ type: ACCOUNTS_LOAD_SUCCESS }),
        accountsLoadFailure: () => dispatch({ type: ACCOUNTS_LOAD_FAILURE }),
        addAccounts: accounts => dispatch({ type: ADD_ACCOUNTS, accounts })
    }
};

const fetchAccounts = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Access-Control-Allow-Origin', 'localhost');
    return fetch(new Request('https://gzv95i4ix3.execute-api.us-east-1.amazonaws.com/prod/api/account/list'), { headers: myHeaders })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            log("fetchAccounts error:", error);
        });
};

const loadAccounts = async (loading, success, failure, addAccounts) => {
    try {
        loading();
        const accountsResponse = await fetchAccounts();
        const accounts = _.get(accountsResponse, 'data');
        addAccounts(accounts);
        return success();
    }
    catch (err) {
        return failure();
    }
};

const accountsLoading = props => _.get(props, 'accounts.loading');
const getAccountListOrLoading = props =>
{
    if(accountsLoading(props) === false)
    {
        const accounts = _.get(props, 'accounts.accounts');
        return <AccountList accounts={accounts} onAccountClick={()=> log('yo')}></AccountList>;
    }
    else
    {
        return <CircularProgress />;
    }
};

export class AccountsView extends React.Component {
    render() {
        return <div>
            {getAccountListOrLoading(this.props)}
        </div>
    }

    componentDidMount() {
        const { loadingAcounts, accountsLoadSuccess, accountsLoadFailure, addAccounts } = this.props;
        loadAccounts(loadingAcounts, accountsLoadSuccess, accountsLoadFailure, addAccounts);
    }
}

export const VisibleAccounts = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountsView);

