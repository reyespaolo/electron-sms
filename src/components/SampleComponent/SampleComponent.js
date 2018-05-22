import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Button} from 'primereact/components/button/Button';
import Aux from '../../hoc/Aux';

class sampleComponent extends Component{

  constructor(props){
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount(){
      this.inputElement.current.focus();
  }

  render(){
    return(
      <Aux>
        <p>Home Compoenent</p>
        <input ref={this.inputElement}/>
        <div>Params: {this.props.match.params.paramsId || "No Params"}</div>
        <div><Button className="ui-button-warning" label={this.props.sampleProp||'Sample Button'}/></div>
      </Aux>
    );
  }

}

sampleComponent.propTypes = {
  sampleProp:PropTypes.string
}
export default sampleComponent;
