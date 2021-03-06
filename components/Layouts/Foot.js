import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withWidth from '@material-ui/core/withWidth';

export default withWidth()(({ muscles, category, onSelect, width }) => {
	console.log(width);
	const index = category ? muscles.findIndex(group => group === category) + 1 : 0;
	const onIndexselect = (e, index) =>
		onSelect(index === 0 ? '' : muscles[index-1])

	return <Paper>
		<Tabs
			value={index}
			onChange={onIndexselect}
			indicatorColor="primary"
			textColor="primary"
			centered={width !== 'xs'}
			scrollable={width === 'xs'}
		>
			<Tab label="All" />
			{muscles.map(group =>
				<Tab key={group} label={group} />
			)}
		</Tabs>
	</Paper>
})
