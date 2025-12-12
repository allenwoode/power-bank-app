import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ActionButton {
	label: string;
	backgroundColor: string;
	onPress: () => void;
}

interface DeviceActionButtonsProps {
	primaryButton: ActionButton;
	secondaryButton?: ActionButton;
	showSecondary?: boolean;
}

export default function DeviceActionButtons({
	primaryButton,
	secondaryButton,
	showSecondary = false,
}: DeviceActionButtonsProps) {
	const insets = useSafeAreaInsets();

	return (
		<View
			className="gap-3 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-black"
			style={{ paddingBottom: insets.bottom + 12 }}
		>
			<Pressable
				className={`items-center rounded-lg p-4 ${primaryButton.backgroundColor}`}
				android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
				onPress={primaryButton.onPress}
			>
				<Text className="text-base font-semibold text-white">
					{primaryButton.label}
				</Text>
			</Pressable>

			{showSecondary && secondaryButton && (
				<Pressable
					className={`items-center rounded-lg p-4 ${secondaryButton.backgroundColor}`}
					android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
					onPress={secondaryButton.onPress}
				>
					<Text className="text-base font-semibold text-white">
						{secondaryButton.label}
					</Text>
				</Pressable>
			)}
		</View>
	);
}
