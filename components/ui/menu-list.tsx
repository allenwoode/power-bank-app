import { useColorScheme } from '@/hooks/use-color-scheme';
import { ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

export interface MenuItem {
	id: string;
	icon: React.ReactNode;
	title: string;
	subtitle: string;
	onPress?: () => void;
	showSwitch?: boolean;
	switchValue?: boolean;
	onSwitchChange?: (value: boolean) => void;
}

interface MenuListProps {
	items: MenuItem[];
}

function ToggleSwitch({ value }: { value: boolean }) {
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
	);
}

export default function MenuList({ items }: MenuListProps) {
	const [pressedItem, setPressedItem] = useState<string | null>(null);
	const colorScheme = useColorScheme();

	return (
		<View className="overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800">
			{items.map((item, index) => (
				<Pressable
					key={item.id}
					onPress={() => {
						if (item.showSwitch && item.onSwitchChange) {
							item.onSwitchChange(!item.switchValue);
						} else if (item.onPress) {
							item.onPress();
						}
					}}
					onPressIn={() => setPressedItem(item.id)}
					onPressOut={() => setPressedItem(null)}
					className={`flex-row items-center px-4 py-4 ${
						pressedItem === item.id ? 'bg-gray-100 dark:bg-gray-700' : ''
					} ${
						index !== items.length - 1
							? 'border-b border-gray-200 dark:border-gray-700'
							: ''
					}`}
					android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
				>
					<View className="mr-4">
						{React.isValidElement(item.icon)
							? React.cloneElement(
									item.icon as React.ReactElement<{ color: string }>,
									{ color: colorScheme === 'dark' ? 'white' : '#666' }
								)
							: item.icon}
					</View>
					<View className="flex-1">
						<Text className="text-base font-medium text-black dark:text-white">
							{item.title}
						</Text>
						<Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							{item.subtitle}
						</Text>
					</View>
					{item.showSwitch && item.onSwitchChange ? (
						<ToggleSwitch value={item.switchValue || false} />
					) : (
						<ChevronRight
							size={20}
							color={colorScheme === 'dark' ? 'white' : '#999'}
						/>
					)}
				</Pressable>
			))}
		</View>
	);
}
