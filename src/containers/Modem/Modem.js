import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadModems,onConnectModem,changeModemStatus } from '../../store/actions/modemActions';
import ListModems from '../../components/ListModems/ListModems';
import * as actionTypes from '../../store/actions/actionTypes';
const isElectron = window && window.process && window.process.type
let ipcRenderer = null;
if(isElectron) ipcRenderer = window.require('electron').ipcRenderer;

class Modem extends Component {

  componentDidMount(){
    this.initializeListeners();
  }


  initializeListeners () {
    if (isElectron) {
        ipcRenderer.on('MODEM:Listener', (err, payload) => {
          if(payload.status === 'success'){
            switch(payload.action) {
              case 'LISTEN_OPEN_PORTS': {
                this.props.loadModems(payload.data);
                break;
              }
              case 'MODEM_CONNECTED': {
                console.log('connected' , payload)
                this.props.changeModemStatus({modem:{comName: payload.data.modem.modem}}, 'Connected');
                break;
              }
              default:
                break;
            }
          }else{
            console.log(payload)
          }
        })
    }
  }



  render() {
    return (
          <div className="ui-g">
                <div className="ui-g-6"><ListModems onConnect = {(payload) => {this.onModemConnect(payload)}} modems={this.props.modems}/></div>
                {/* <div className="ui-g-6"><ModemOptions  modemOptions={this.props.modemOptions}/></div> */}
          </div>

    );
  }


  onModemConnect(payload){
    this.props.onConnectModem(payload)
    ipcRenderer.send('MODEM:Actions', {'status':'success', 'module': 'Modem', 'action': actionTypes.CONNECTING_MODEM, 'data': {modem: payload, modemOptions:null}})
  }


}





const mapStateToProps = state => {
  return {
    modems : state.modem.modems
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadModems: (modems) => dispatch(loadModems(modems)),
    onConnectModem: (modem) => dispatch(onConnectModem(modem)),
    changeModemStatus: (modem, status) => dispatch(changeModemStatus(modem, status))
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Modem);
