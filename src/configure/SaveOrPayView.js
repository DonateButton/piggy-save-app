import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

const SaveOrPayView = () => (
  <div className='col'>
    <RaisedButton><Link to="/configure/2">Save Money</Link></RaisedButton>
    <br />
    <RaisedButton>Pay Off Debt</RaisedButton>
  </div>
)

export default SaveOrPayView;