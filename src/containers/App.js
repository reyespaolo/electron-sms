import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { withRouter } from "react-router-dom";
import {mainRoute} from '../routes'
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/themes/cupertino/theme.css';

import {Toolbar} from 'primereact/components/toolbar/Toolbar';
import {Button} from 'primereact/components/button/Button';

import { increment,decrement } from '../store/actions/actionTypes';

class App extends Component {

  handleModemSettingsClick = () => {
    this.props.history.push({pathname: '/modem'})
  }

  handleSendSMSClick = () => {
    this.props.history.push({pathname: '/sendsms'})
  }


  render() {
    return (
        <StyleRoot>
          <div>
            <header>
            </header>
            <Toolbar>
                  <div className="ui-toolbar-group-left">
                      <Button label="Send SMS" onClick={this.handleSendSMSClick} className="ui-button-warning"/>
                  </div>
                  <div className="ui-toolbar-group-right">
                      <Button className="ui-button-danger" icon="fa-cogs" onClick={this.handleModemSettingsClick}/>
                  </div>
              </Toolbar>
          </div>

            {mainRoute}
        </StyleRoot>
    );
  }
}



const mapStateToProps = state => {
  return {
    counter: state.counter.counter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(increment()),
    onDecrementCounter:() => dispatch(decrement())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

//
// Redux Counter State: {this.props.counter}
//
