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
	// 是否只显示一个按钮（用于纯提示）
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
			animationType="fade" // 淡入淡出效果
			transparent={true} // 背景透明，这样才能看到底下的半透明遮罩
			visible={visible}
			onRequestClose={onCancel} // 安卓物理返回键关闭
		>
			{/* 
         1. 外层容器：全屏半透明黑色背景 
         bg-black/50 代表 50% 透明度的黑色 (NativeWind 写法)
      */}
			<TouchableWithoutFeedback onPress={onCancel}>
				<View className="flex-1 items-center justify-center bg-black/50 px-6">
					{/* 
             2. 弹窗卡片：白色背景，圆角，阴影 
             active:scale-100 用于阻止点击卡片时触发外层的关闭事件
          */}
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
