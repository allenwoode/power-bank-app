import React, { useState, useEffect } from 'react';
import {
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Keyboard,
} from 'react-native';
import { X } from 'lucide-react-native';

interface BottomModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	showCloseButton?: boolean;
}

export default function BottomModal({
	visible,
	onClose,
	title,
	children,
	showCloseButton = true,
}: BottomModalProps) {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const showListener = Keyboard.addListener('keyboardDidShow', (e) =>
			setKeyboardHeight(e.endCoordinates.height)
		);
		const hideListener = Keyboard.addListener('keyboardDidHide', () =>
			setKeyboardHeight(0)
		);
		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, []);

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable
				style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
				onPress={onClose}
			>
				<TouchableWithoutFeedback>
					<View
						className="w-full rounded-t-3xl bg-white p-6 pb-8 shadow-2xl dark:bg-gray-900"
						style={{
							position: 'absolute',
							bottom: keyboardHeight,
							left: 0,
							right: 0,
						}}
					>
						{/* 标题栏 */}
						{title && (
							<View className="mb-4 flex-row items-center justify-between">
								<Text className="text-xl font-bold text-gray-900 dark:text-white">
									{title}
								</Text>
								{showCloseButton && (
									<TouchableOpacity onPress={onClose} className="p-2">
										<X size={24} color="#9CA3AF" />
									</TouchableOpacity>
								)}
							</View>
						)}

						{/* 内容 */}
						{children}
					</View>
				</TouchableWithoutFeedback>
			</Pressable>
		</Modal>
	);
}
