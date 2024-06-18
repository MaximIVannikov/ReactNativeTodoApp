import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, ScrollView, StatusBar } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from './../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
	const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
	const { changeScreen } = useContext(ScreenContext);
	const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

	const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height - 180);

	// const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

	useEffect(() => {
		// loadTodos();
		fetchTodos();
	}, []);

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
			setDeviceWidth(width);
			const height = Dimensions.get('window').height - 180;
			setDeviceHeight(height);
		};
		const subscription = Dimensions.addEventListener('change', update);

		return () => {
			subscription?.remove();
		};
	});

	let content = (
		<View style={{ width: deviceWidth, height: deviceHeight }}>
			<FlatList
				// contentContainerStyle={{ width: deviceWidth, height: deviceHeight }}
				keyExtractor={(item) => item.id.toString()}
				data={todos}
				renderItem={({ item }) => <Todo todo={item} removeTodo={removeTodo} onOpen={changeScreen} />}
			/>
		</View>
	);

	if (loading) {
		return <AppLoader />;
	}

	if (error) {
		return (
			<View style={styles.center}>
				<AppText style={styles.error}>{error}</AppText>
				<AppButton
					onPress={fetchTodos}
					// onPress={loadTodos}
				>
					Reply
				</AppButton>
			</View>
		);
	}

	if (todos.length === 0) {
		content = (
			<View style={styles.imgWrap}>
				<Image style={styles.image} source={require('../../assets/no-items.png')} />
			</View>
		);
	}

	return (
		<View>
			<AddTodo onSubmit={addTodo} />
			{content}
		</View>
	);
};

const styles = StyleSheet.create({
	// container: {
	// 	height: deviceHeight,
	// },
	imgWrap: {
		alignContent: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR,
	},
});
