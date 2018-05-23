import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment,decrement } from '../../store/actions/actionTypes';
import ModemOptions from '../../components/ModemOptions/ModemOptions';

class Modem extends Component {

  render() {
    return (
          <div className="ui-g">
                <div className="ui-g-6">

                </div>
                <div className="ui-g-6">
                  <ModemOptions modemOptions={this.props.modemOptions}/>
                </div>
          </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    modemOptions: state.modem.modemOptions
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(increment()),
    onDecrementCounter:() => dispatch(decrement())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Modem);
