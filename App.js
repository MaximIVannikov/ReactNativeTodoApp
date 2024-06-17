import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';

async function loadApplication() {
	await Font.loadAsync({
		'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
	});
}

export default function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await loadApplication();
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
				SplashScreen.hideAsync();
			}
		}
		// if (isReady === false) {
		prepare();
		// }
	}, []);

	if (!isReady) {
		return null;
	}

	return (
		<ScreenState>
			<TodoState>
				<MainLayout />
			</TodoState>
		</ScreenState>
	);
}
