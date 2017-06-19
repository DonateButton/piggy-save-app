import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const log = console.log;

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const amountsToButtons = (ammounts, onAmountClick, context) =>
{
    log("ammounts:", ammounts);
    log("onAmountClick:", onAmountClick);
    log("context:", context);
    return <RadioButtonGroup name="amountChosen" defaultSelected={1}
    onChange={(event, value)=> onAmountClick(value)}>
        {ammounts.map(amount =>
        (<RadioButton
            key={amount.id}
            value={amount.total}
            label={amount.amountDisplay}
            style={styles.radioButton}
        />))}
    </RadioButtonGroup>
};

export const ChooseAmountView = ({amounts, onAmountClick, onSaveAmountChosen, history}) => 
{
  return <div>
      <p>Each time the Change Button is pressed, the amount you select below will transfer into your savings account from your checking account.</p>
      <div style={styles.root}>
       {amountsToButtons(amounts, onAmountClick)}
       <RaisedButton 
            label="Save" 
            fullWidth={true}
            onClick={()=> onSaveAmountChosen(history)} />
    </div>
  </div>
  };

const mapStateToProps = state =>
{
  return {
    amounts: state.amounts
  };
};
const mapDispatchToProps = dispatch =>
{
  return {
    onAmountClick: amount => {
      dispatch({type: 'SELECTED_AMOUNT', amount});
    },
    onSaveAmountChosen: history =>
    {
        history.push('/my-new-location')
        dispatch({type: 'CHOOSE_AMOUNT'});
    }
  }
};

export const ChooseAmountViewRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChooseAmountView));