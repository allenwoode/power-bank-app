import { useColorScheme } from '@/hooks/use-color-scheme';
import { AlertCircle } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Modal,
	Pressable,
	Animated as RNAnimated,
	Text,
	View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type CustomAlertProps = {
	visible: boolean;
	title: string;
	message: string | React.ReactNode;
	tip?: string | React.ReactNode;
	icon?: React.ReactNode;
	primaryColor?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	showCancel?: boolean;
};

export default function CustomAlert({
	visible,
	title,
	message,
	tip,
	icon,
	primaryColor = '#007AFF',
	confirmText,
	cancelText,
	onConfirm,
	onCancel,
	showCancel = true,
}: CustomAlertProps) {
	const colorScheme = useColorScheme();
	const { t } = useTranslation();
	const confirmTextValue = confirmText || t('confirm');
	const cancelTextValue = cancelText || t('cancel');
	const defaultIcon = (
		<AlertCircle size={20} color={colorScheme === 'dark' ? 'white' : '#666'} />
	);
	const displayIcon = icon || defaultIcon;

	const cancelPressAnim = useRef(new RNAnimated.Value(0)).current;
	const confirmPressAnim = useRef(new RNAnimated.Value(0)).current;

	const animatePress = (anim: RNAnimated.Value, toValue: number) => {
		RNAnimated.timing(anim, {
			toValue,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (visible) {
			cancelPressAnim.setValue(0);
			confirmPressAnim.setValue(0);
		}
	}, [visible, cancelPressAnim, confirmPressAnim]);
	return (
		<Modal transparent visible={visible} animationType="fade">
			<View
				className={`flex-1 ${colorScheme === 'dark' ? 'bg-black/50' : 'bg-black/50'} items-center justify-center px-6`}
			>
				<Animated.View
					entering={FadeIn.duration(200)}
					exiting={FadeOut.duration(200)}
					className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-800"
				>
					{/* 上 - 标题区域 */}
					<View
						className="border-b px-6 py-3"
						style={{
							borderBottomColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
						}}
					>
						<View className="flex-row items-center">
							<View>{displayIcon}</View>
							<Text className="ml-2 flex-1 text-xl font-bold text-black dark:text-white">
								{title}
							</Text>
						</View>
					</View>

					{/* 中 - 内容区域 */}
					<View className="p-6">
						{typeof message === 'string' ? (
							<Text className="text-lg leading-6 text-gray-600 dark:text-gray-400">
								{message}
							</Text>
						) : (
							message
						)}
						{tip && (
							<View className="mt-2">
								{typeof tip === 'string' ? (
									<Text className="text-sm text-gray-500 dark:text-gray-500">
										{tip}
									</Text>
								) : (
									tip
								)}
							</View>
						)}
					</View>

					{/* 下 - 按钮区域 */}
					<View
						className="flex-row border-t"
						style={{
							borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
						}}
					>
						{showCancel && (
							<Pressable
								onPress={onCancel}
								onPressIn={() => animatePress(cancelPressAnim, 1)}
								onPressOut={() => animatePress(cancelPressAnim, 0)}
								className="relative flex-1 items-center py-3"
								style={{
									borderRightWidth: 1,
									borderRightColor:
										colorScheme === 'dark' ? '#374151' : '#E5E7EB',
								}}
								android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
							>
								<RNAnimated.View
									className="absolute inset-0 bg-black/5 dark:bg-white/5"
									style={{ opacity: cancelPressAnim }}
								/>
								<Text className="text-lg font-medium text-gray-600 dark:text-gray-300">
									{cancelTextValue}
								</Text>
							</Pressable>
						)}
						<Pressable
							onPress={onConfirm}
							onPressIn={() => animatePress(confirmPressAnim, 1)}
							onPressOut={() => animatePress(confirmPressAnim, 0)}
							className="relative flex-1 items-center py-3"
							style={{ backgroundColor: primaryColor + '10' }}
							android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
						>
							<RNAnimated.View
								className="absolute inset-0 bg-black/5 dark:bg-white/5"
								style={{ opacity: confirmPressAnim }}
							/>
							<Text
								className="text-lg font-semibold"
								style={{ color: primaryColor }}
							>
								{confirmTextValue}
							</Text>
						</Pressable>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
}
