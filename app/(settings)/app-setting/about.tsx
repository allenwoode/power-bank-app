import Card from '@/components/ui/card';
import TopTitle from '@/components/ui/top-title';
import CustomAlert from '@/utils/my-alert';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { Info } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AboutPage() {
	const { t } = useTranslation();
	const [showUpdateAlert, setShowUpdateAlert] = useState(false);

	const handleCheckUpdate = () => {
		setShowUpdateAlert(true);
	};

	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<TopTitle title={t('settings-app-setting-about-title')} showBack={true} />
			<View className="flex-1 bg-gray-100 px-4 pt-6 dark:bg-black">
				<Card
					variant="elevated"
					title={t('settings-app-setting-about-title')}
					icon={<Info size={18} />}
					className="mb-4"
				>
					<View className="p-4">
						<View className="space-y-3">
							<View>
								<Text className="text-sm text-gray-500 dark:text-gray-400">
									{t('settings-app-setting-about-version')}
								</Text>
								<Text className="text-base text-gray-900 dark:text-white">
									{Constants.expoConfig?.version || '1.0.0'}
								</Text>
							</View>
							<View>
								<Text className="text-sm text-gray-500 dark:text-gray-400">
									{t('settings-app-setting-about-developer')}
								</Text>
								<Text className="text-base text-gray-900 dark:text-white">
									{t('settings-app-setting-about-developer-value')}
								</Text>
							</View>
							<View>
								<Text className="text-sm text-gray-500 dark:text-gray-400">
									{t('settings-app-setting-about-copyright')}
								</Text>
								<Text className="text-base text-gray-900 dark:text-white">
									{t('settings-app-setting-about-copyright-value')}
								</Text>
							</View>
							<TouchableOpacity onPress={handleCheckUpdate} className="pt-2">
								<Text className="text-base text-blue-600 dark:text-blue-400">
									{t('settings-app-setting-about-check-update')}
								</Text>
								<Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{t('settings-app-setting-about-check-update-desc')}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Card>
			</View>
			<CustomAlert
				visible={showUpdateAlert}
				title={t('settings-app-setting-about-check-update')}
				message={t('settings-app-setting-about-check-update-desc')}
				onConfirm={() => {
					setShowUpdateAlert(false);
					// 这里可以添加实际的检查更新逻辑
				}}
				onCancel={() => setShowUpdateAlert(false)}
				confirmText={t('update-check')}
				cancelText={t('cancel')}
			/>
		</>
	);
}
