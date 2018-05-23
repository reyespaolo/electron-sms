import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import {InputText} from 'primereact/components/inputtext/InputText';
import classes from './ModemOptions.css'

class modemOptions extends Component{

  state = {
      baudRate: '',
      dataBits: 0,
      parity: '',
      stopBits: 0,
      flowControl: false,
      xon: false,
      rtscts: false,
      xoff: false,
      xany: false,
      buffersize: 0,
      onNewMessage: true,
      onNewMessageIndicator: true
  }

  componentDidMount(){
    this.setState({
      baudRate: this.props.modemOptions.baudRate,
      dataBits: this.props.modemOptions.dataBits,
      parity: this.props.modemOptions.parity,
      stopBits: this.props.modemOptions.stopBits,
      flowControl: this.props.modemOptions.flowControl,
      xon: this.props.modemOptions.xon,
      rtscts: this.props.modemOptions.rtscts,
      xoff: this.props.modemOptions.xoff,
      xany: this.props.modemOptions.xany,
      buffersize: this.props.modemOptions.buffersize,
    })
  }

  render(){
    return(

      <Aux>
        <div className="ui-g">
          <div className="ui-g-6">
              <div className={classes.Group}>
                <label>Baud Rate</label><br/>
                <InputText value = {this.state.baudRate}  onChange={(e) => this.setState({baudRate: e.target.boudRate})}/>
              </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>Data Bits</label><br/>
              <InputText value = {this.state.dataBits}  onChange={(e) => this.setState({dataBits: e.target.boudRate})}/>
            </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>Parity</label><br/>
              <InputText value = {this.state.parity}  onChange={(e) => this.setState({dataBits: e.target.parity})}/>
            </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>Stop Bits</label><br/>
              <InputText value = {this.state.stopBits}  onChange={(e) => this.setState({dataBits: e.target.stopBits})}/>
            </div>
          </div>

          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>Flow Control</label><br/>
              <InputText value = {this.state.flowControl}  onChange={(e) => this.setState({dataBits: e.target.flowControl})}/>
            </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>xOn</label><br/>
              <InputText value = {this.state.xon}  onChange={(e) => this.setState({dataBits: e.target.xon})}/>
            </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>rtscts</label><br/>
              <InputText value = {this.state.rtscts}  onChange={(e) => this.setState({dataBits: e.target.rtscts})}/>
            </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>xOff</label><br/>
              <InputText value = {this.state.xoff}  onChange={(e) => this.setState({dataBits: e.target.xoff})}/>
            </div>
          </div>

          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>xAny</label><br/>
              <InputText value = {this.state.xany}  onChange={(e) => this.setState({dataBits: e.target.xany})}/>
            </div>
          </div>
          <div className="ui-g-6">
            <div className={classes.Group}>
              <label>Buffer Size</label><br/>
              <InputText value = {this.state.buffersize}  onChange={(e) => this.setState({dataBits: e.target.buffersize})}/>
            </div>
          </div>
        </div>
      </Aux>
    );
  }

}

export default modemOptions;
