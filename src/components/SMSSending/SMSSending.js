import React, { Component } from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
const isElectron = window && window.process && window.process.type
let ipcRenderer = null;
if(isElectron) {
  ipcRenderer = window.require('electron').ipcRenderer;
  window.require('electron').ipcRenderer.setMaxListeners(20)
}
class SMSSending extends Component {


  constructor(props){
    super(props);
    this.state = {
        contactSuggestions: null,
        textArea:'',
        disableButton: 'disabled'
    };
  }

  componentDidMount(){
    if(isElectron) {
      this.setState({disableButton: ''})
      ipcRenderer.on('SMSSending:SendSMS',(err,args)=>{
      })
    }
  }

  handleMessageSend = () => {
    if(isElectron){
      let payload = {
        'contact':this.state.contacts.mobileNumber,
        'message': this.state.textArea
      }
      ipcRenderer.send('SMSSending:SendSMS', payload)
    }
  }

  suggestContacts(event) {
        let results = this.props.contacts.filter((contact) => {
             return contact.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ contactSuggestions: results });

  }

  render(){


    let inputElement = null;
    if(this.props.contacts){
      inputElement = <AutoComplete field="name" value={this.state.contacts} onChange={(e) => this.setState({contacts: e.value})}
                  suggestions={this.state.contactSuggestions} completeMethod={this.suggestContacts.bind(this)} />
    }else{
      inputElement = <InputText onChange={(e) => this.setState({contacts: e.target.value})}/>
    }

    return (
      <span>
        <div className="ui-g">
            <div className="ui-g-12">
              {inputElement}
            </div>
            <div className="ui-g-12">
              <InputTextarea rows={5} cols={30} value={this.state.value} onChange={(e) => this.setState({textArea: e.target.value})} />
            </div>
            <div className="ui-g-12">
              <Button disabled={this.state.disableButton}  onClick={this.handleMessageSend} className="pull-left" label="Send SMS" icon="fa-envelope-open" />
            </div>
        </div>

    </span>
    );

  }



  }


export default SMSSending;
