import React, { Component, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Icon from '@material-ui/core/Icon';
import Form from './Form';

export default class extends Component {

	componentDidMount() {
		loadCSS(
			'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
			document.querySelector('#insertion-point-jss'),
		);
	}

	state = {
		open: false
	}

	handleToggle = () => {
		this.setState({
			open: !this.state.open
		})
	}
	handleFormSubmit = exercise => {
		this.handleToggle()
		this.props.onCreate(exercise)
	}

	render() {
		const { open } = this.state,
			{muscles} = this.props
		return <Fragment>
			<Fab onClick={this.handleToggle}>
				<Icon className={'fa fa-plus-circle'} color="primary" />
			</Fab>
			<Dialog
				open={open}
				onClose={this.handleToggle}
			>
				<DialogTitle id="form-dialog-title">
					Create a New Exercise
			</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill out the form below
            </DialogContentText>
					<Form
						muscles={muscles}
						onSubmit={this.handleFormSubmit}
					/>
				</DialogContent>
			</Dialog>
		</Fragment>
	}
}
