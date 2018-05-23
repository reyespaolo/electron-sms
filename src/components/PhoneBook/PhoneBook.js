import React from 'react';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';

const PhoneBook = (props) => {

  return(
    <div>
      <DataTable value={props.phoneBook}>
        <Column field="name" header="Full Name" />
        <Column field="mobileNumber" header="Mobile Number" />
      </DataTable>
    </div>
  )

  }


export default PhoneBook;
