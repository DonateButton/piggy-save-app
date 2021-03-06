import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LoadingScreen from './LoadingScreen';

import NotFoundScreen from './NotFoundScreen';
import SaveOrPayView from './configure/SaveOrPayView';
import './configure/SaveOrPayView.css';
import {SaveMoneyViewRedux} from './configure/SaveMoneyView';
import {ChooseAmountViewRedux} from './configure/ChooseAmountView';
import LoginView from './login/LoginView';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import logger from 'redux-logger'

import { accounts } from './accounts/accounts.reducer';
import { selectedAccount } from './accounts/selectedAccount.reducer';
import { amounts } from './configure/amounts.reducer';
import { chosenAmounts } from './configure/chosenAmounts.reducer';
import { login } from './login/login.reducer';
import _ from 'lodash';

import {VisibleAccounts } from './accounts/VisibleAccounts';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const log = console.log;

const store = createStore(combineReducers({
  accounts, 
  selectedAccount, 
  amounts,
  chosenAmounts,
  login
}), applyMiddleware(logger));


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

        <Route path="/login" component={LoginView}/>
        <Route path="/accounts" component={VisibleAccounts}/>
        <Route path="/configure/1" component={SaveOrPayView}/>
        <Route path="/configure/2" component={SaveMoneyViewRedux}/>
        <Route path="/configure/3" component={ChooseAmountViewRedux}/>
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

export default App;
