import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadModems,connectModem } from '../../store/actions/modemActions';
import ListModems from '../../components/ListModems/ListModems';

const isElectron = window && window.process && window.process.type
let ipcRenderer = null;
if(isElectron) ipcRenderer = window.require('electron').ipcRenderer;
// import ModemOptions from '../../components/ModemOptions/ModemOptions';

class Modem extends Component {


  connectModem(payload){
    ipcRenderer.send('MODEM:onConnect', payload)
  }



  render() {
    return (
          <div className="ui-g">
                <div className="ui-g-6"><ListModems onConnect = {(payload) => {this.onModemConnect(payload)}} modems={this.props.modems}/></div>
                {/* <div className="ui-g-6"><ModemOptions  modemOptions={this.props.modemOptions}/></div> */}
          </div>

    );
  }

  componentDidMount(){

    if (isElectron) {
        ipcRenderer.on('MODEM:AvailablePorts', (err, payload) => {
          this.props.loadModems(payload)
        })
    }
  }

  onModemConnect(payload){
    this.connectModem(payload);
    this.props.connectModem(payload)
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
    connectModem: (modem) => dispatch(connectModem(modem))

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Modem);
