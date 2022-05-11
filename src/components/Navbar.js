import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export class NavBar extends React.Component {
    
    render() {
        return (
            <div className="App">
                <AppBar position="sticky">
                    <Toolbar>
                        
                        <Typography variant="h5" color="inherit">
                            Personal trainer
                        </Typography>
                    </Toolbar>
                </AppBar>

                
            </div>
        );
    }
}
