import React, { Component,Fragment } from 'react';
import { Head, Foot } from '../components/Layouts';
import Exercises from '../components/Exercises';
import { muscles,exercises } from '../store';

export default class indexPage extends Component{

	state = {
		exercises,
		exercise: {}
	}

	getExercisesByMuscles() {
		return Object.entries(
			this.state.exercises.reduce((exercises, exercise) => {
				const { muscles } = exercise;
				exercises[muscles] = exercises[muscles] ? [...exercises[muscles], exercise] : [exercise]
				return exercises;
			}, {})
		)
	}

	handleCategorySelected = category => {
		this.setState({
			category
		})
	}

	handleExerciseSelected = id => {
		this.setState(({ exercises }) => ({
			exercise: exercises.find(ex => ex.id === id)
		}))
	}

	render() {
		const exercises = this.getExercisesByMuscles(),
			{ category, exercise } = this.state
		return <Fragment>
			<Head
				muscles={muscles}
			/>
			<Exercises
				exercise={exercise}
				category={category}
				exercises={exercises}
				onSelect={this.handleExerciseSelected}
			></Exercises>
			<Foot
				category={category}
				muscles={muscles}
				onSelect={this.handleCategorySelected}
			 />
		</Fragment>
	}
}