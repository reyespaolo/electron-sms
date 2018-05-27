import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Button} from 'primereact/components/button/Button';

class ListModems extends Component{

  actionTemplate = (rowData, column) => {
    let color = null;
    if(rowData.status === 'Connected') {
      color ='ui-button-success'
    }else if (rowData.status === 'Offline') {
      color ='ui-button-danger'
    }else if(rowData.status === 'Connecting..'){
      color = 'ui-button-warning'
    }
    return <div>
        <Button type="button" icon="fa-signal" onClick={()=>{this.props.onConnect(rowData)}} className={color}></Button>
    </div>;
  }

  statusColor(rowData, column) {
    let color = null;
    if(rowData.status === 'Connected') {
      color = 'green'
      return <span style={{color: color}}>{rowData['status']}</span>;
    } else if(rowData.status === 'Connecting..'){
      color = 'orange'
      return <span style={{color: color}}>{rowData['status']}</span>;
    }else{
      color = 'red'
      return <span style={{color: color}}>{rowData['status']}</span>;
    }
  }


  render(){
    // console.log(this.props.modems[0].status)
    // console.log('list')
    // console.log(this.props.modems)

    return(
      <Aux>
        <DataTable value={this.props.modems}>
          <Column field="comName" header="Port / Modem" />
          <Column field="status" header="Status" body={this.statusColor} />
          <Column body={this.actionTemplate} style={{textAlign:'center', width: '6em'}}/>
        </DataTable>
      </Aux>
    );
  }

}

export default ListModems;
//test
