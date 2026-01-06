import React from 'react';
import {
	Modal,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

interface CustomAlertProps {
	visible: boolean;
	title: string;
	message?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
	singleButton?: boolean;
}

export default function CustomAlert({
	visible,
	title,
	message,
	onConfirm,
	onCancel,
	confirmText = '确定',
	cancelText = '取消',
	singleButton = false,
}: CustomAlertProps) {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onCancel}
		>
			<TouchableWithoutFeedback onPress={onCancel}>
				<View className="flex-1 items-center justify-center bg-black/50 px-6">
					<TouchableWithoutFeedback>
						<View className="w-full max-w-sm items-center rounded-3xl bg-white p-6 shadow-xl">
							{/* 标题 */}
							<Text className="mb-2 text-center text-xl font-bold text-gray-900">
								{title}
							</Text>

							{/* 内容 */}
							{message && (
								<Text className="mb-6 text-center text-base leading-6 text-gray-500">
									{message}
								</Text>
							)}

							{/* 按钮区域 */}
							<View className="w-full flex-row space-x-4">
								{/* 取消按钮 (如果不是单按钮模式才显示) */}
								{!singleButton && (
									<TouchableOpacity
										onPress={onCancel}
										className="flex-1 items-center justify-center rounded-xl bg-gray-100 py-3 active:bg-gray-200"
									>
										<Text className="text-base font-bold text-gray-600">
											{cancelText}
										</Text>
									</TouchableOpacity>
								)}

								{/* 确认按钮 */}
								<TouchableOpacity
									onPress={onConfirm}
									className="flex-1 items-center justify-center rounded-xl bg-black py-3 active:opacity-80"
								>
									<Text className="text-base font-bold text-white">
										{confirmText}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}
