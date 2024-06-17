import React, { useState } from 'react';

import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from '../components/ui/AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
	const [title, setTitle] = useState(value);

	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Error!', `Minimum length of name is 3 characters. Now is ${title.trim().length} characters`);
		} else {
			onSave(title);
		}
	};

	const cancelHandler = () => {
		setTitle(value);
		onCancel();
	};
	return (
		<Modal visible={visible} animationType="slide" transparent={false}>
			<View style={styles.wrap}>
				<TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Name..." autoCapitalize="none" autoCorrect={false} maxLength={64} />
				<View style={styles.buttons}>
					<AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
						Cancel
					</AppButton>
					<AppButton onPress={saveHandler}>Save</AppButton>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%',
	},

	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
