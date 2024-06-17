import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('');
	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value);
			setValue('');
			Keyboard.dismiss();
		} else {
			Alert.alert('Todo title cannot be empty');
			//error
		}
	};

	return (
		<View style={styles.block}>
			<TextInput
				autoCorrect={false}
				// keyboardType="twitter"
				autoCapitalize="none"
				style={styles.input}
				value={value}
				onChangeText={setValue}
				placeholder="Type your Todo"
			/>
			<AntDesign.Button name="pluscircleo" size={24} onPress={pressHandler}>
				Add
			</AntDesign.Button>
			{/* <Button style={styles.button} onPress={pressHandler} title="Add" /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	input: {
		width: '60%',
		borderStyle: 'solid',
		borderBottomWidth: 2,
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
	},
	button: {},
});
