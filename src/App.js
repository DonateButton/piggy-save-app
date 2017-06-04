import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LoadingScreen from './LoadingScreen';
import AccountList from './accounts/AccountList';
import NotFoundScreen from './NotFoundScreen';

import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

function accounts(state=[{id: 1, name: 'Hey'}], action)
{
  console.log("action:", action);
  switch(action.type)
  {
    case 'ADD_ACCOUNT':
      const newAccount = {id: 2, name: 'Thing'}; 
      const newList = [...state, newAccount];
      console.log("newList:", newList);
      return newList;
    default:
      return state;
  }
}

const store = createStore(accounts);
const mapStateToProps = state =>
{
  return {
    accounts: state
  };
};
const mapDispatchToProps = dispatch =>
{
  console.log("mapDispatchToProps:", dispatch);
  return {
    onAccountClick: (id) => {
      dispatch({type: 'ADD_ACCOUNT'});
    }
  }
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
    <div>
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
