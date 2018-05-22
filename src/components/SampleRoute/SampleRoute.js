import React, { Component } from 'react';
import {TabView,TabPanel} from 'primereact/components/tabview/TabView';
import Input from './../UI/Input/Input';
import Aux from '../../hoc/Aux';

class sampleRoute extends Component{
  state = {
    sampleForm:{
      name: {
        elementType: "input",
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          name: 'name',
          size: 30
        },
        value: ''
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: 'text',
          placeholder: 'Email',
          name: 'email',
          size: 30
        },
        value: ''
      },
      gender: {
        elementType: 'select',
        elementConfig: {
          placeholder: 'Gender',
          options:[{label: "Male", value:'male'},{label: "Female", value:'female'} ],
          name:'gender',
          size: 30
        },
        value:''
      }
    }
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedSampleForm = {
      ...this.state.sampleForm
    }
    const updatedFormElement = {
      ...updatedSampleForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedSampleForm[inputIdentifier] = updatedFormElement;
    this.setState({sampleForm:updatedSampleForm})
  }

  render(){
    let formElementsArray = [];
    for(let key in this.state.sampleForm){
      formElementsArray.push({
        id: key,
        config: this.state.sampleForm[key]
      })
    }

    return(
      <Aux>
        <TabView>
          <TabPanel header="Tab One"  leftIcon="fa-calendar">

          </TabPanel>
          <TabPanel header="Tab Two"  rightIcon="fa-print">
            Tab Two
          </TabPanel>
          <TabPanel header="Tab Three"  leftIcon="fa-bell-o" rightIcon="fa-bookmark-o">
            Tab Three
          </TabPanel>
        </TabView>

        <div className="ui-g">
          {formElementsArray.map((formElement) => {
            return   <div key={formElement.id} className="ui-g-6"><Input
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed ={(event) => this.inputChangeHandler(event,formElement.id)}
            /></div>
          })}
        </div>
      </Aux>
    );
  }

}

export default sampleRoute;
