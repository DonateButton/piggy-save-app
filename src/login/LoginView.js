import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux'
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE} from './login.reducer';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

const log = console.log;

const login = (username, password) => new Promise((success, failure)=>
{
    try
    {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch(new Request('https://gzv95i4ix3.execute-api.us-east-1.amazonaws.com/prod/api/user/login'), 
        { headers: myHeaders, method: "POST", body: JSON.stringify({username, password}) })
            .then(response => {
                try
                {
                    const parsed = response.json();
                    success(parsed);
                }
                catch(err)
                {
                    failure(new Error("Failed to parse response JSON."));
                }
            })
            .catch(error => {
                log("login error:", error);
                failure(new Error("login error: " + error));
            });
    }
    catch(err)
    {
        failure(new Error("Unknown error:", err));
    }
});


const loginUser = async (username, password, loading, success, failure) => {
    try {
        loading();
        const userResponse = await login(username, password);
        log("loginUser, userResponse:", userResponse);
        const user = _.get(userResponse, 'data');
        return success(user);
    }
    catch (err) {
        log("loginUser, err:", err);
        return failure(err);
    }
};

const style = {
  margin: 12
};

const toggleStyle = {
    block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  }
};

const onLoginClick = (username, password, start, success, failure)=> 
{
    log("username:", username);
    log("password:", password);
    log("start:", start);
    log("success:", success);
    log("failure:", failure);
    return loginUser(username, password, start, success, failure);
};

let username;
let password;

const LoginFormFillout = (loginStart, loginSuccess, loginFailure) =>
(
  <div style={style}>
  <h2>Login</h2>
  <TextField hintText="username or email" 
    onChange={event=> username = event.target.value } ></TextField><br />
  <TextField
      hintText="Password"
      floatingLabelText="Password"
      type="password"
      onChange={event=> password = event.target.value }
    /><br />
    <Toggle
      label="Remember Me"
      style={toggleStyle}
      labelPosition="right"
    /><br />
    <RaisedButton label="Primary" primary={true} onClick={()=> onLoginClick(
        username, 
        password,
        loginStart, loginSuccess, loginFailure)}/>
  </div>
);

const LoginFormLoading = ()=> (
    <div style={style}>
        <CircularProgress />
        <div>Logging In...</div>
    </div>
);

const LoginForm = ({login, loginStart, loginSuccess, loginFailure}) =>
{
    if(login.loading === false)
    {
        return LoginFormFillout(loginStart, loginSuccess, loginFailure);
    }
    else
    {
        return LoginFormLoading();
    }
};


const mapStateToProps = state =>
{
    return {
        login: state.login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginStart: ()=> dispatch({type: LOGIN_START}),
        loginSuccess: user => dispatch({type: LOGIN_SUCCESS, user}),
        loginFailure: error => dispatch({type: LOGIN_FAILURE, error})
    }
};

export const LoginView = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginView;
