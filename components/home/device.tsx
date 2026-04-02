import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDebouncedNavigation } from '@/hooks/use-debounced-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import {
	CircleOff,
	LayoutGrid,
	LayoutList,
	Plus,
	Zap,
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DeviceItem {
	id: string;
	name: string;
	type?: string;
	color: string;
	addedAt?: string;
}

// 用于测试/演示的默认展示设备（不存入 AsyncStorage，仅在无已保存设备时显示）
const DEMO_DEVICES: DeviceItem[] = [
	{
		id: 'demo-device-1',
		name: 'PowerBank Pro',
		type: 'PB-100',
		color: '#3B82F6',
	},
];

export function Device() {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation();
	const { push } = useDebouncedNavigation(500);
	const colorScheme = useColorScheme();
	const [isGridView, setIsGridView] = useState<boolean>(true);
	const [devices, setDevices] = useState<DeviceItem[]>(DEMO_DEVICES);

	// 加载已保存的设备，无保存数据时显示演示设备
	const loadDevices = useCallback(async () => {
		try {
			const devicesJson = await AsyncStorage.getItem('devices');
			if (devicesJson) {
				const savedDevices = JSON.parse(devicesJson);
				if (Array.isArray(savedDevices) && savedDevices.length > 0) {
					// 为每个设备添加颜色
					const devicesWithColor = savedDevices.map(
						(device: any, idx: number) => ({
							...device,
							color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][idx % 4],
						})
					);
					setDevices(devicesWithColor);
					return;
				}
			}
			// 无已保存设备时回退到演示设备
			setDevices(DEMO_DEVICES);
		} catch (err) {
			console.error('Load devices error:', err);
			setDevices(DEMO_DEVICES);
		}
	}, []);

	// 当页面获得焦点时重新加载设备
	useFocusEffect(
		useCallback(() => {
			loadDevices();
		}, [loadDevices])
	);

	const renderDeviceCard = ({ item }: { item: DeviceItem }) => (
		<Pressable
			onPress={() => push(`/(device)/${item.id}`)}
			android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
			style={{
				flex: isGridView ? 0.5 : 1,
				marginVertical: 8,
			}}
		>
			<View
				className="items-center justify-center rounded-2xl p-4"
				style={{
					backgroundColor: item.color,
					height: 140,
				}}
			>
				<Zap size={32} color="white" />
				<Text className="mt-2 text-base font-semibold text-white">
					{item.name}
				</Text>
				<Text className="mt-1 text-xs text-white/80">{item.type}</Text>
			</View>
		</Pressable>
	);

	return (
		<View className="flex-1" style={{ paddingTop: insets.top + 8 }}>
			<View className="flex-row items-center justify-between px-6 py-4">
				<Text className="text-2xl font-semibold text-black dark:text-white">
					{t('device-title')}
				</Text>
				<View className="flex-row items-center justify-center gap-4">
					<Pressable onPress={() => push('/(device)/add')}>
						<Plus
							size={28}
							color={colorScheme === 'dark' ? 'white' : 'black'}
						/>
					</Pressable>
					<Pressable onPress={() => setIsGridView(!isGridView)}>
						{isGridView ? (
							<LayoutGrid
								size={24}
								color={colorScheme === 'dark' ? 'white' : 'black'}
							/>
						) : (
							<LayoutList
								size={24}
								color={colorScheme === 'dark' ? 'white' : 'black'}
							/>
						)}
					</Pressable>
				</View>
			</View>

			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				{devices.length === 0 ? (
					<View className="flex-1 items-center justify-center py-20">
						<CircleOff size={68} color="#9CA3AF" />
						<Text className="mt-4 text-xl text-gray-500">
							{t('device-hint')}
						</Text>

						<View className="mt-2 flex-row items-center">
							<Text className="text-base text-gray-400">
								{t('device-add-pre')}
							</Text>
							<Plus
								size={15}
								color={colorScheme === 'dark' ? 'white' : 'black'}
							/>
							<Text className="text-base text-gray-400">
								{t('device-add-post')}
							</Text>
						</View>
					</View>
				) : (
					<FlatList
						key={isGridView ? 'grid' : 'list'}
						data={devices}
						renderItem={renderDeviceCard}
						keyExtractor={(item) => item.id}
						numColumns={isGridView ? 2 : 1}
						scrollEnabled={false}
						columnWrapperStyle={
							isGridView
								? {
										justifyContent: 'flex-start',
										gap: 12,
										paddingHorizontal: 12,
									}
								: undefined
						}
						contentContainerStyle={{
							paddingHorizontal: isGridView ? 0 : 12,
						}}
					/>
				)}
			</ScrollView>
		</View>
	);
}
