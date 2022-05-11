import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import Addcustomer from './AddCustomer';

export default function Customers(){
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
      fetchCustomers();
    }, []);
    
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then(data => setCustomers(data.content))
        .catch((err) => console.error(err));
    }

    const addCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(customer)
      })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
        }
        else {
          alert('Something went wrong when adding customer');
        }
      })
      .catch(err => console.error(err))
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true , width: 140 },
        { field: 'lastname', sortable: true, filter: true, width: 140 },
        { field: 'streetaddress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true, width: 120 },
        { field: 'city', sortable: true, filter: true, width: 120 },
        { field: 'email', sortable: true, filter: true},
        { field: 'phone', sortable: true, filter: true},

        
    ]
    return(
        <>
        <Addcustomer addCustomer={addCustomer} />
          <div className="ag-theme-material" style={{height: '600px', width: '70%'}}>
            <AgGridReact 
              columnDefs={columns}
              rowData={customers}
              pagination={true}
              paginationPageSize={10}
              suppressCellFocus={true}
            />
          </div>
          <Snackbar 
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
          />
        </>
      )
    }