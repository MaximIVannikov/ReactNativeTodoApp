import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types';

const handlers = {
	[ADD_TODO]: (state, { title, id }) => ({
		...state,
		todos: [...state.todos, { id, title }],
	}),
	[REMOVE_TODO]: (state, { id }) => ({
		...state,
		todos: state.todos.filter((todo) => todo.id !== id),
	}),
	[UPDATE_TODO]: (state, { id, title }) => ({
		...state,
		todos: state.todos.map((todo) => {
			if (todo.id === id) {
				todo.title = title;
			}
			return todo;
		}),
	}),
	[SHOW_LOADER]: (state) => ({ ...state, loading: true }),
	[HIDE_LOADER]: (state) => ({ ...state, loading: false }),
	[SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
	[CLEAR_ERROR]: (state) => ({ ...state, error: null }),
	[FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
	DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);

	// switch (action.type) {
	// 	case ADD_TODO:
	// 		return { ...state, todos: [...state.todos, { id: Date.now().toString(), title: action.title }] };
	// 	case REMOVE_TODO:
	// 		return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
	// 	case UPDATE_TODO:
	// 		return {
	// 			...state,
	// 			todos: state.todos.map((todo) => {
	// 				if (todo.id === action.id) {
	// 					todo.title = action.title;
	// 				}
	// 				return todo;
	// 			}),
	// 		};

	// 	default:
	// 		return state;
	// }
};
