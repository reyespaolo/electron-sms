import React, { Component } from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';

class SMSSending extends Component {


  constructor(props){
    super(props);
    this.state = {
        contactSuggestions: null
    };
    // this.contacts = [{name:'Audi'}];
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
              <InputTextarea rows={10} cols={30} autoResize={true} />
            </div>
            <div className="ui-g-12">
              <Button className="pull-left" label="Send SMS" icon="fa-envelope-open" />
            </div>
        </div>



    </span>
    );

  }



  }


export default SMSSending;
