import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';

const input = (props) => {
  let inputElement = null;
  console.log(props)
  switch(props.elementType) {
    case('input'):
      inputElement = <span className="ui-float-label">
                      <InputText value = {props.value} onChange={props.changed} id={props.elementConfig.name} type={props.elementConfig.type} name={props.elementConfig.name} size={props.elementConfig.size} />
                      <label htmlFor={props.elementConfig.name}>{props.elementConfig.placeholder}</label>
                    </span>
      break;
    case('select'):
      inputElement = <Dropdown  onChange={props.changed} options={props.elementConfig.options}  style={{width:'120px'}}  placeholder={props.elementConfig.placeholder} itemTemplate={(option) => {
        return <div className="ui-helper-clearfix">
               <div style={{float:'right',margin:'.5em .25em 0 0'}}>{option.label}</div>
              </div>
      }}/>
      break;
    default:
      inputElement = <span className="ui-float-label">
                    <InputText onChange={props.changed} id={props.elementConfig.name} type={props.elementConfig.type} name={props.elementConfig.name} size={props.elementConfig.size} />
                    <label htmlFor={props.elementConfig.name}>{props.elementConfig.placeholder}</label>
                  </span>
      break
    }


  return(
    <div>
      {inputElement}
    </div>
  )

  }


export default input;
