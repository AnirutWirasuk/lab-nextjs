import React, { Fragment} from 'react';
import LeftPane from '../Exercises/LeftPane';
import RightPane from '../Exercises/RightPane';
import { Typography,Grid,Paper,List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
	Paper: { padding: 20, marginTop: 10, marginBottom: 10, height: 500, overflowY: 'auto' }
}

export default ({
	exercises,
	category,
	onSelect,
	exercise: {
		id,
		title = 'Welcome!',
		description = 'Please select an exercise from the list on the left.'
	} }) =>
	<Grid container>
		<Grid item sm>
			<Paper style={styles.Paper}>
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
								</ListItem>
							)}
						</List>
					</Fragment>
				: null
				)}
			</Paper>
		</Grid>
		<Grid item sm>
			<Paper style={styles.Paper}>
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
			</Paper>
		</Grid>
	</Grid>