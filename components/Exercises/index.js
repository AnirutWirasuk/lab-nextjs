import React, { Fragment} from 'react';
import { Typography,Grid,Paper,List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Edit, Delete } from '@material-ui/icons';
import Form from './Form';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	paper: {
		padding: 20,
		marginTop: 5,
		height: 'calc(100% - 10px)',
		overflowY: 'auto'
	},
	'@global': {
		'html,body, #root': {
			height:'100%'
		}
	},
	container: {
    	height: 'calc(100% - 64px - 48px)'
	}
})

export default withStyles(styles)(({
	classes,
	exercises,
	category,
	onSelect,
	editMode,
	muscles,
	exercise,
	exercise: {
		id,
		title = 'Welcome!',
		description = 'Please select an exercise from the list on the left.'
	},
	onDelete,
	onSelectEdit,
	onEdit}) =>
	<Grid container className={classes.container}>
		<Grid item xs={12} sm={6}>
			<Paper className={classes.paper}>
				{exercises.map(([group, exercises]) =>
				!category || category === group ?
					<Fragment key={group}>
						<Typography
							variant="headline"
							style={{textTransform: 'capitalize'}}
						>
							{group}
						</Typography>
						<List component="nav">
							{exercises.map(({ id, title }) =>
								<ListItem
									key={id}
									button
									onClick={() => onSelect(id)}
								>
								<ListItemText primary={title} />
								<ListItemSecondaryAction>
								<IconButton onClick={() => onSelectEdit(id)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => onDelete(id)}>
									<Delete />
								</IconButton>
								</ListItemSecondaryAction>
								</ListItem>
							)}
						</List>
					</Fragment>
				: null
				)}
			</Paper>
		</Grid>
		<Grid item xs={12} sm={6}>
			<Paper className={classes.paper}>
				{editMode
					? <Form
						exercise={exercise}
						muscles={muscles}
						onSubmit={onEdit}
					/>
			: <Fragment>
				<Typography
					variant="display1"
				>
					{title}
				</Typography>
				<Typography
					variant="subheading"
					style={{marginTop:20}}
				>
					{description}
				</Typography>
			</Fragment>}

			</Paper>
		</Grid>
	</Grid>
)