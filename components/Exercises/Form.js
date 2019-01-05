import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
	FormControl: {
		width: 300
	},
	xsFormControl: {
		width: 250
	}
})

export default withStyles(styles)(class extends Component{
	state = this.getInitState()

	getInitState() {
		const { exercise } = this.props

		return exercise ? exercise : {
			title: '',
			description: '',
			muscles: ''
		}
	}

	static getDerivedStateFromProps({exercise}) {
		return exercise || null
	}

	handleChange = name => ({ target: { value } }) => {
		this.setState({
			[name]: value
		});
	};

	handleSubmit = () => {
		// TODO: vlidate
		// const { exercise } = this.state
		this.props.onSubmit({
			id: this.state.title.toLocaleLowerCase().repeat(/ /g,'-'),
			...this.state
		})
		this.setState(this.getInitState())
	}
	render() {
		const { title,description,muscles} = this.state,
			{ classes, exercise, muscles: categories } = this.props;
		return (
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
									<MenuItem key={category} value={category}>{category}</MenuItem>
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
				<br />
				<Button
						color="primary"
						variant="raised"
						onClick={this.handleSubmit}
					>
				{exercise ? 'Edit' : 'Create'}
            		</Button>

					</form>
		)
	}
})