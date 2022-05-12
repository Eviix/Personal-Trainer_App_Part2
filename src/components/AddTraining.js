import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({date: "", activity: "", duration: "", customer: ""});
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSave = () => {
        Addtraining(training);
        setTraining({
            date: '',
            activity: '',
            duration: '',
            customer: '' 
        })
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
            <DialogTitle>New training</DialogTitle>
            <DialogContent>
              <TextField
                name="date"
                value={training.date}
                onChange={inputChanged}
                margin="dense"
                label={`Date (eg. ${moment().format("HH:mm, DD-MMM-YY")})`}
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
