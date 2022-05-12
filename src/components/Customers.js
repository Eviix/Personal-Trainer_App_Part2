import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addtraining from './AddTraining';
import Addcustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

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

    const deleteCustomer = (link) => {
      if (window.confirm('Are you sure?')) {
        fetch(link, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setMsg('Customer deleted');
            setOpen(true);
            fetchCustomers();
          }
          else {
            alert('Something went wrong');
          }
        })
      }
    }

    const addCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(customer)
      })
      .then(response => {
        if (response.ok) {
          setMsg('Customer added successfully');
          fetchCustomers();
        }
        else {
          alert('Something went wrong when adding customer');
        }
      })
      .catch(err => console.error(err))
    }

    const updateCustomer = (updatedCustomer, link) => {
      fetch(link, {
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(updatedCustomer)
      })
      .then(response => {
        if (response.ok) {
          setMsg('Customer edited succesfully');
          setOpen(true);
          fetchCustomers();
        }
        else {
          alert('Something went wrong!');
        }
      })
      .catch(err => console.error(err))
    }

    const addTraining = training => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(training)
        })
        .then(response => {
          if (response.ok) {
            setMsg('Training added');
            setOpen(true);
            fetchCustomers();
          }
          else {
            alert('Something went wrong!');
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

        {
          headerName: '',
          width: 100,
          field: 'links.0.href',
          cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
          headerName: '',
          width: 100,
          field: 'links.0.href',
          cellRenderer: params => 
            <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
              <DeleteIcon />
            </IconButton>
        },
        {
          headerName: '',
          width: 200,
          field: 'links.0.href',
          cellRenderer: params => <Addtraining addTraining={addTraining} params={params} />
        },
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