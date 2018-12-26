import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateDialog from '../Exercises/Dialogs/Create';

export default ({muscles}) =>
	<AppBar position="static">
        <Toolbar>
			<Typography variant="h6" color="inherit" style={{flex:1}}>
            	Exercises Database
          	</Typography>
			<CreateDialog
				muscles={muscles}
			/>
        </Toolbar>
    </AppBar>