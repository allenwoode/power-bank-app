import { useColorScheme } from '@/hooks/use-color-scheme';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
	BackHandler,
	Dimensions,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	SlideInDown,
	SlideOutDown,
	useAnimatedKeyboard,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height;
/*
 * 原生 Modal 在处理键盘弹出时会有一些问题，尤其是在 Android 上
 * 这里使用一个自定义的底部弹出 Modal 组件
 */

export default function BottomModal({
	visible,
	onClose,
	title,
	children,
}: {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}) {
	const colorScheme = useColorScheme();
	const iconColor = colorScheme === 'dark' ? '#D1D5DB' : '#374151';
	const insets = useSafeAreaInsets();
	const keyboard = useAnimatedKeyboard();
	const [modalHeight, setModalHeight] = useState(0);

	// Android 返回键拦截 模拟 Modal 关闭
	useEffect(() => {
		if (!visible) return;

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				onClose();
				return true;
			}
		);

		return () => backHandler.remove();
	}, [visible, onClose]);

	const animatedStyle = useAnimatedStyle(() => {
		'worklet';
		const keyboardOffset = keyboard.height.value;

		// 计算 Modal 顶部位置
		const modalTop = SCREEN_HEIGHT - modalHeight - keyboardOffset;

		// 如果顶部位置小于安全区域，限制移动
		const minTop = insets.top;

		if (modalTop < minTop && modalHeight > 0) {
			// 计算实际可以移动的最大距离
			const maxOffset = SCREEN_HEIGHT - modalHeight - minTop;
			return {
				transform: [{ translateY: -maxOffset }],
			};
		}

		return {
			transform: [{ translateY: -keyboardOffset }],
		};
	}, [modalHeight, insets.top]);

	if (!visible) return null;

	return (
		<View className="absolute inset-0" pointerEvents="box-none">
			<Animated.View
				className="absolute inset-0 bg-black/40"
				style={{ zIndex: 55 }}
				entering={FadeIn.duration(450).easing(
					Easing.bezier(0.25, 0.1, 0.25, 1)
				)}
				exiting={FadeOut.duration(350).easing(
					Easing.bezier(0.25, 0.1, 0.25, 1)
				)}
			>
				<Pressable className="flex-1" onPress={onClose} />
			</Animated.View>

			<Animated.View
				className="absolute bottom-0 left-0 right-0"
				style={[{ zIndex: 60 }, animatedStyle]}
				entering={SlideInDown.duration(450).easing(
					Easing.bezier(0.25, 0.1, 0.25, 1)
				)}
				exiting={SlideOutDown.duration(350).easing(
					Easing.bezier(0.4, 0, 0.6, 1)
				)}
				onLayout={(e) => {
					setModalHeight(e.nativeEvent.layout.height);
				}}
			>
				<View
					className="rounded-t-3xl bg-white px-6 py-4 dark:bg-gray-900"
					style={{
						paddingBottom: Math.max(insets.bottom, 16),
					}}
				>
					{title && (
						<View className="mb-4 mt-1 flex-row items-center justify-between">
							<Text className="text-xl font-semibold text-gray-900 dark:text-white">
								{title}
							</Text>
							<TouchableOpacity onPress={onClose}>
								<X size={24} color={iconColor} />
							</TouchableOpacity>
						</View>
					)}
					{children}
				</View>
			</Animated.View>
		</View>
	);
}
