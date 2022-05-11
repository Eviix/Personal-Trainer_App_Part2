import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';

export default function Trainings(){
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const gridRef = useRef();
    const [msg, setMsg] = useState('');
   
    useEffect(() => {
        fetchTrainings();
    }, []);
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then((response) => response.json())
        .then(data => setTrainings(data.content))
        .catch((err) => console.error(err));
    }

    const columns = [
        { field: 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("HH:mm, DD-MMM-YY")}, sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true }
    ]

    return(
        <>
          <div className="ag-theme-material" style={{height: '600px', width: '70%'}}>
            <AgGridReact 
              columnDefs={columns}
              rowData={trainings}
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

 