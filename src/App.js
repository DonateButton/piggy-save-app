import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LoadingScreen from './LoadingScreen';
import AccountList from './accounts/AccountList';
import NotFoundScreen from './NotFoundScreen';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import logger from 'redux-logger'

import { accounts } from './accounts/accounts.reducer';
import _ from 'lodash';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const log = console.log;

const store = createStore(combineReducers({accounts}), applyMiddleware(logger));
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
      // dispatch({type: 'ADD_ACCOUNT'});
      log("Yo, id:", id);
    }
  }
};

const fetchAccounts = ()=>
{
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append('Access-Control-Allow-Origin', 'localhost');
  return fetch(new Request('https://gzv95i4ix3.execute-api.us-east-1.amazonaws.com/prod/api/account/list'), {headers: myHeaders})
  .then(response =>
  {
    return response.json();
  })
  .catch(error =>
  {
    log("fetchAccounts error:", error);
  });
};

const loadAccounts = async ()=>
{
  const accountsResponse = await fetchAccounts();
  const accounts = _.get(accountsResponse, 'data');
  return store.dispatch({type: 'ADD_ACCOUNTS', accounts});
};

const VisibleAccounts = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountList)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <MuiThemeProvider>
      <div>
          <AppBar
              title="Title"
            />
        <ul>
          <li><Link to="/">Loading Screen</Link></li>
          <li><Link to="/accounts">Accounts</Link></li>
          <li><Link to="/notfound">Not Found</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={LoadingScreen}/>
        <Route path="/accounts" component={VisibleAccounts}/>
        <Route path="/notfound" component={NotFoundScreen}/>
      </div>
    </MuiThemeProvider>
  </Router>
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BasicExample />
      </Provider>
    );
  }
}

loadAccounts();

export default App;
