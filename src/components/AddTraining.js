import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Addtraining({ addTraining, params }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({date: "", activity: "", duration: "", customer: params.value })

    const [customer, setCustomer] = React.useState({customerInfo: ''})
    
    const handleClickOpen = () => {
      setOpen(true);
      setCustomer({customerInfo: params.data.firstname + " " + params.data.lastname
      })
    };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        addTraining(training, params.value);
        setTraining({ date: '',activity: '',duration: '',customer: '' })
        setOpen(false);
      }
    
      const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
      }
    
      return (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new training
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New training({customer.customerInfo})</DialogTitle>
            <DialogContent>
              <TextField
                name="date"
                value={training.date}
                onChange={inputChanged}
                margin="dense"
                label="For example (YYYY-MM-DD)"  
                fullWidth
                variant="standard"
              />
              <TextField
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                margin="dense"
                label="activity"
                fullWidth
                variant="standard"
              />
              <TextField
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                margin="dense"
                label="duration"
                fullWidth
                variant="standard"
              />
              <TextField
                name="customer"
                value={training.customer}
                onChange={inputChanged}
                margin="dense"
                label="customer"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
