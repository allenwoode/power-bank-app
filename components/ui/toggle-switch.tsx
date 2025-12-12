import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface ToggleSwitchProps {
	title: string;
	description?: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
	disabled?: boolean;
}

export default function ToggleSwitch({
	title,
	description,
	value,
	onValueChange,
	disabled = false,
}: ToggleSwitchProps) {
	const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

	React.useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: value ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [value, animatedValue]);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [2, 22],
	});

	const backgroundColor = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['#e5e7eb', '#3b82f6'],
	});

	return (
		<TouchableOpacity
			onPress={() => !disabled && onValueChange(!value)}
			disabled={disabled}
			className="flex-row items-center justify-between p-4"
			activeOpacity={0.7}
		>
			<View className="mr-4 flex-1">
				<Text
					className={`text-base font-medium ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-black dark:text-white'}`}
				>
					{title}
				</Text>
				{description && (
					<Text
						className={`mt-1 text-sm ${disabled ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'}`}
					>
						{description}
					</Text>
				)}
			</View>
			<View className="relative">
				<Animated.View
					className="h-6 w-12 rounded-full"
					style={{ backgroundColor }}
				/>
				<Animated.View
					className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
					style={{ transform: [{ translateX }] }}
				/>
			</View>
		</TouchableOpacity>
	);
}
