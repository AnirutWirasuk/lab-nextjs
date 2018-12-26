import React, { Component, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
	FormControl: {
		width: 500
	}
})

export default withStyles(styles)(class extends Component {

	componentDidMount() {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
			document.querySelector('#insertion-point-jss'),
		);
	}

	state = {
		open: false,
		exercise: {
			title: '',
			description: '',
			muscles: ''
		}
	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open
		})
	}

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = name => ({ target: { value } }) => {
		this.setState({
			exercise: {
				...this.state.exercise,
				[name]: value
			}
		});
	};

	render() {
		const { open, exercise: { title, description, muscles } } = this.state,
			{ classes, muscles: categories } = this.props

		return <Fragment>
			<Fab onClick={this.handleToggle}>
				<Icon className={'fa fa-plus-circle'} color="primary" />
			</Fab>
			<Dialog
				open={open}
				onClose={this.handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					Create a New Exercise
			</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill out the form below
            </DialogContentText>
					<form>
						<TextField
							className={classes.FormControl}
							label="Title"
							value={title}
							onChange={this.handleChange('title')}
							margin="normal"
						/>
						<br />
						<FormControl
							className={classes.FormControl}
						>
							<InputLabel htmlFor="muscles">Muscles</InputLabel>
							<Select

								value={muscles}
								onChange={this.handleChange('muscles')}
							>
								{categories.map(category =>
									<MenuItem value={category}>{category}</MenuItem>
								)}
							</Select>
						</FormControl>
						<br />
						<TextField
							className={classes.FormControl}
							label="Description"
							multiline
							rows="4"
							value={description}
							onChange={this.handleChange('description')}
							margin="normal"
						/>

					</form>
				</DialogContent>
				<DialogActions>
					<Button color="primary" variant="raised">
						Create
            </Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	}
})
