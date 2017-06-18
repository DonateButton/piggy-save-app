import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import { connect } from 'react-redux'

const log = console.log;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 375,
    height: 375,
    titleBackground: 'rgba(1, 1, 1, 1)'
  },
};

export const ChooseAmountView = ({amounts, onAmountClick}) => (
  <div>
      <p>Each time the Change Button is pressed, the amount you select below will transfer into your savings account from your checking account.</p>
      <div style={styles.root}>
        <GridList
        cellHeight={72}
        style={styles.gridList}
        >
        {amounts.map( amount => (
            <GridTile
            key={amount.id}
            title={amount.amountDisplay}
            onClick={() => onAmountClick(amount.id)}>
            </GridTile>
        ))}
        </GridList>
    </div>
  </div>
)

const mapStateToProps = state =>
{
  return {
    amounts: state.amounts
  };
};
const mapDispatchToProps = dispatch =>
{
  return {
    onAmountClick: (id) => {
      // dispatch({type: 'SELECT_ACCOUNT', accountID: id});
      log("sup:", id);
    }
  }
};

export const ChooseAmountViewRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseAmountView);