import { useColorScheme } from '@/hooks/use-color-scheme';
import { X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
	Keyboard,
	KeyboardEvent,
	Platform,
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
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
	const keyboardHeight = useSharedValue(0);

	useEffect(() => {
		const showSubscription = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			(e: KeyboardEvent) => {
				keyboardHeight.value = withTiming(e.endCoordinates.height, {
					duration: Platform.OS === 'ios' ? 250 : 200,
				});
			}
		);

		const hideSubscription = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			() => {
				keyboardHeight.value = withTiming(0, {
					duration: Platform.OS === 'ios' ? 250 : 200,
				});
			}
		);

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, [keyboardHeight]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: -keyboardHeight.value }],
	}));

	if (!visible) return null;

	return (
		<View className="absolute inset-0" pointerEvents="box-none">
			<Animated.View
				className="absolute inset-0 bg-black/40"
				style={{ zIndex: 55 }}
				entering={FadeIn.duration(200)}
				exiting={FadeOut.duration(150)}
			>
				<Pressable className="flex-1" onPress={onClose} />
			</Animated.View>

			<Animated.View
				className="absolute bottom-0 left-0 right-0"
				style={[{ zIndex: 60 }, animatedStyle]}
				entering={SlideInDown.easing(Easing.out(Easing.quad))}
				exiting={SlideOutDown.easing(Easing.in(Easing.quad))}
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
