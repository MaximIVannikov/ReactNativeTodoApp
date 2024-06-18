import React, { useReducer, useContext } from 'react';
import { TodoContext } from './todoContext';
import { Alert } from 'react-native';
import { todoReducer } from './todoReducer';
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null,
	};

	const { changeScreen } = useContext(ScreenContext);
	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = async (title) => {
		// const response = await fetch('https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ title }),
		// });
		// const data = await response.json();
		clearError();
		try {
			const data = await Http.post('https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos.json', { title });
			dispatch({ type: ADD_TODO, title, id: data.name });
		} catch (error) {
			showError('Something goes wrong ... ');
		}
	};
	const removeTodo = (id) => {
		const todo = state.todos.find((t) => t.id === id);
		Alert.alert(
			'Remove element',
			`Are you sure you want delete element ${todo.title} ?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					style: 'destructive',
					onPress: async () => {
						changeScreen(null);
						// await fetch(`https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
						// 	method: 'DELETE',
						// 	headers: { 'Content-Type': 'application/json' },
						// });
						await Http.delete(`https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
						dispatch({ type: REMOVE_TODO, id });
					},
				},
			],
			{
				cancelable: false,
			}
		);
	};
	const updateTodo = async (id, title) => {
		clearError();
		showLoader();
		try {
			await Http.patch(`https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, { title });
			// await fetch(`https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
			// 	method: 'PATCH',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ title }),
			// });
			dispatch({ type: UPDATE_TODO, id, title });
		} catch (e) {
			showError('Something was wrong...');
			console.log(e);
		} finally {
			hideLoader();
		}
	};

	const showLoader = () => dispatch({ type: SHOW_LOADER });
	const hideLoader = () => dispatch({ type: HIDE_LOADER });
	const clearError = () => dispatch({ type: CLEAR_ERROR });
	const showError = (error) => dispatch({ type: SHOW_ERROR, error });
	const fetchTodos = async () => {
		showLoader();
		clearError();

		try {
			// const response = await fetch('https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
			// 	method: 'GET',
			// 	headers: { 'Content-Type': 'application/json' },
			// });
			// const data = await response.json();

			const data = await Http.get('https://rn-todo-app-9fa06-default-rtdb.europe-west1.firebasedatabase.app/todos.json');
			const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
			dispatch({ type: FETCH_TODOS, todos });
		} catch (e) {
			showError('Something was wrong...');
			console.log(e);
		} finally {
			hideLoader();
		}
	};

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				loading: state.loading,
				error: state.error,
				addTodo,
				removeTodo,
				updateTodo,
				fetchTodos,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
