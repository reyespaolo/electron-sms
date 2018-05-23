import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment,decrement } from '../../store/actions/actionTypes';
import ModemOptions from '../../components/ModemOptions/ModemOptions';
import ListModems from '../../components/ListModems/ListModems';
const isElectron = window && window.process && window.process.type
let ipcRenderer = null;
if(isElectron) ipcRenderer = window.require('electron').ipcRenderer;

class Modem extends Component {
  state = {
    'availableModems': []
  }

  constructor(props){
    super(props);
    this.checkModem = this.checkModem.bind(this)
  }



  connectModem(payload){
    ipcRenderer.send('MODEM:onConnect', payload)
  }



  render() {
    return (
          <div className="ui-g">
                <div className="ui-g-6"><ListModems onConnect = {(payload) => {this.onModemConnect(payload)}} modems={this.state.availableModems}/></div>
                <div className="ui-g-6"><ModemOptions  modemOptions={this.props.modemOptions}/></div>
          </div>

    );
  }

  componentDidMount(){
    if (isElectron) {
        ipcRenderer.on('MODEM:AvailablePorts', (err, payload) => {
          this.checkModem(payload)
        })
    }
  }

  onModemConnect(payload){
    let tempModem = [...this.state.availableModems]
    for(let key in tempModem){
      if(tempModem[key].comName === payload.comName){
        console.log(payload.comName)
        if(tempModem[key].status === 'Offline'){
          tempModem[key].status = 'Connecting'
          this.connectModem(payload);
        }
      }
    }
    this.setState({availableModems:tempModem})
  }

  checkModem = payload => {
    if (this.state) {
      let tempAvailableModems = [...payload]
      console.log(tempAvailableModems)
      let removedModems = []
      let newModems = []
      if (this.state.availableModems) {
        //removed
        for (let key in this.state.availableModems) {
          let index = tempAvailableModems.findIndex(a => a.comName === this.state.availableModems[key].comName)
          if (index < 0) removedModems.push(this.state.availableModems[key])
        }
        //newx
        for (let key in tempAvailableModems) {
          let index = this.state.availableModems.findIndex(a => a.comName === tempAvailableModems[key].comName)
          tempAvailableModems[key].status = 'Offline'
          if (index < 0) newModems.push(tempAvailableModems[key])
        }
      }
      if (removedModems.length || newModems.length) {
        let newAvailableModems = [...this.state.availableModems]
        for (let key in removedModems) {
          let index = newAvailableModems.findIndex(a => a.comName === removedModems[key].comName)
          if (index > -1) newAvailableModems.splice(index, 1)
        }
        if (newModems.length) newAvailableModems = newAvailableModems.concat(newModems)
        this.setState({ availableModems: [...newAvailableModems] })
      }
    } else {
      this.setState({ availableModems: payload })
    }
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
