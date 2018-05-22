import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { withRouter, NavLink } from "react-router-dom";
import {mainRoute} from '../routes'
import classes from './App.css';
import { increment,decrement } from '../store/actions/actionTypes';
import logo from '../assets/logo.svg';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/themes/cupertino/theme.css';

class App extends Component {
  handleClick = () => {
    this.props.history.push({pathname: '/123467'})
  }

  render() {
    return (
        <StyleRoot>
          Redux Counter State: {this.props.counter}

          <div className={classes.App}>
            <header className={classes.AppHeader}>
              <img src={logo} className={classes.AppLogo} alt="logo" />
              <h1 className="AppTitle">React with CSS Modules</h1>
            </header>
            <nav>
              <ul className={classes.MenuBar}>
                <li><NavLink exact activeStyle={{color:'#ffa500'}} className={classes.Menu} to="/">Home Route</NavLink></li>
                <li><NavLink className={classes.Menu} activeStyle={{color:'#ffa500'}} to="/sample_route">Sample Route</NavLink></li>
                <li><NavLink className={classes.Menu} activeStyle={{color:'#ffa500'}} to="/123">Sample Route with Params</NavLink></li>
                <li><a className={classes.Menu} onClick={this.handleClick}>Navigate onClick</a></li>
                <li><a className={classes.Menu} onClick={this.props.onIncrementCounter}>Counter +</a></li>
                <li><a className={classes.Menu} onClick={this.props.onDecrementCounter}>Counter -</a></li>


              </ul>
            </nav>
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
