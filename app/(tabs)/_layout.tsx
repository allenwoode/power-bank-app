import { Tabs, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Platform, ToastAndroid } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslation();

	// 双击返回退出应用
	const lastBackPress = useRef(0);

	useFocusEffect(
		useCallback(() => {
			if (Platform.OS !== 'android') return;

			const onBackPress = () => {
				const now = Date.now();

				/*
				 * Android 上仅调用 BackHandler.exitApp() 时，冷启动后偶现页面过渡动画丢失。
				 */
				if (lastBackPress.current && now - lastBackPress.current < 2000) {
					BackHandler.exitApp();
					return true;
				}

				// 第一次返回
				lastBackPress.current = now;
				ToastAndroid.show(t('press-back-again-to-exit'), ToastAndroid.SHORT);
				return true;
			};

			const subscription = BackHandler.addEventListener(
				'hardwareBackPress',
				onBackPress
			);

			return () => subscription.remove();
		}, [t])
	);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={() => null}
		>
			<Tabs.Screen name="index" options={{ title: t('tab-home') }} />
			<Tabs.Screen name="mine" options={{ href: null }} />
		</Tabs>
	);
}
