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
		const initExercises = muscles.reduce((exercises, category) => ({
			...exercises,
			[category]:[]
		}), {})

		return Object.entries(
			this.state.exercises.reduce((exercises, exercise) => {
				const { muscles } = exercise;
				exercises[muscles] = [...exercises[muscles], exercise]
				return exercises;
			}, initExercises)
		)
	}

	handleCategorySelected = category => {
		this.setState({
			category
		})
	}

	handleExerciseSelected = id =>
		this.setState(({ exercises }) => ({
			exercise: exercises.find(ex => ex.id === id),
			editMode:false
		}))

	handleExerciseCreate = exercise =>
		this.setState(({exercises}) => ({
			exercises: [
				...exercises,
				exercise
			]
		}))

	handleExerciseDelete = id =>
		this.setState(({ exercises,exercise,editMode }) => ({
			exercises: exercises.filter(ex => ex.id !== id),
			editMode: exercise.id === id ? false : editMode,
			exercise: exercise.id === id ? {} : exercise
		}))

	handleExerciseSelectEdit = id =>
		this.setState(({ exercises }) => ({
			exercise: exercises.find(ex => ex.id === id),
			editMode: true
		}))

	handleExerciseEdit = exercise => {
		this.setState(({ exercises }) => ({
			exercises: [
				...exercises.filter(ex => ex.id !== exercise.id),
				exercise
			]
		}))
	}

	render() {
		const exercises = this.getExercisesByMuscles(),
			{ category, exercise, editMode } = this.state
		return <Fragment>
			<Head
				muscles={muscles}
				onExerciseCreate={this.handleExerciseCreate}
			/>
			<Exercises
				exercise={exercise}
				category={category}
				exercises={exercises}
				editMode={editMode}
				muscles={muscles}
				onSelect={this.handleExerciseSelected}
				onDelete={this.handleExerciseDelete}
				onSelectEdit={this.handleExerciseSelectEdit}
				onEdit={this.handleExerciseEdit}
			></Exercises>
			<Foot
				category={category}
				muscles={muscles}
				onSelect={this.handleCategorySelected}
			 />
		</Fragment>
	}
}