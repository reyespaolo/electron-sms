import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment,decrement } from '../../store/actions/actionTypes';

class SendSMS extends Component {

  render() {
    return (
        <div>
          Send SMS
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // modem: state.modem.modem
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(increment()),
    onDecrementCounter:() => dispatch(decrement())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SendSMS);
