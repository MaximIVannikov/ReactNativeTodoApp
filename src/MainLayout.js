import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
	const { todoId } = useContext(ScreenContext);
	// const [todoId, setTodoId] = useState(null);
	// const [todos, setTodos] = useState([]);

	// const addTodo = (title) => {
	// 	const newTodo = {
	// 		id: Date.now().toString(),
	// 		title: title,
	// 	};
	// 	// setTodos(todos.concat([newTodo]))

	// 	// setTodos((prevTodos) => {
	// 	// 	return [...prevTodos, newTodo];
	// 	// });

	// 	setTodos((prev) => [...prev, newTodo]);
	// };

	// const removeTodo = (id) => {
	// 	const todo = todos.find((t) => t.id === id);
	// 	Alert.alert(
	// 		'Remove element',
	// 		`Are you sure you want delete element ${todo.title} ?`,
	// 		[
	// 			{
	// 				text: 'Cancel',
	// 				style: 'cancel',
	// 			},
	// 			{
	// 				text: 'Yes',
	// 				style: 'destructive',
	// 				onPress: () => {
	// 					setTodoId(null);
	// 					setTodos((prev) => prev.filter((item) => item.id !== id));
	// 				},
	// 			},
	// 		],
	// 		{
	// 			cancelable: false,
	// 		}
	// 	);
	// };

	// const updateTodo = (id, title) => {
	// 	setTodos((old) =>
	// 		old.map((todo) => {
	// 			if (todo.id === id) {
	// 				todo.title = title;
	// 			}
	// 			return todo;
	// 		})
	// 	);
	// };

	// let content = <MainScreen />;
	// if (todoId) {
	// 	const selectedTodo = todos.find((todo) => todo.id === todoId);
	// 	content = <TodoScreen todo={selectedTodo} goBack={() => changeScreen(null)} removeTodo={removeTodo} onSave={updateTodo} />;
	// }
	return (
		<View style={styles.wrapper}>
			<Navbar title="Todo App" />
			<View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20,
		flex: 1,
	},
	wrapper: {
		flex: 1,
	},
});
