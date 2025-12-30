import TopTitle from '@/components/ui/top-title';
import { useNotifications } from '@/context/notification-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import { BellOff } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
	interpolate,
	runOnJS,
	SharedValue,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface RightActionsProps {
	progress: SharedValue<number>;
	onDelete: () => void;
	deleteLabel: string;
}

function RightActions({ progress, onDelete, deleteLabel }: RightActionsProps) {
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [0, 1], [0, 1]),
	}));

	return (
		<Reanimated.View
			className="ml-2 overflow-hidden rounded-lg"
			style={[{ width: 80, height: '100%' }, animatedStyle]}
		>
			<Pressable
				onPress={onDelete}
				className="h-full items-center justify-center bg-red-500"
			>
				<Text className="font-medium text-white">{deleteLabel}</Text>
			</Pressable>
		</Reanimated.View>
	);
}

function getBackgroundColor(type: string, scheme: string | null | undefined) {
	const isDark = scheme === 'dark';
	const map: any = isDark
		? {
				success: 'bg-green-900',
				warning: 'bg-yellow-900',
				info: 'bg-blue-900',
				default: 'bg-gray-800',
			}
		: {
				success: 'bg-green-50',
				warning: 'bg-yellow-50',
				info: 'bg-blue-50',
				default: 'bg-gray-50',
			};
	return map[type] || map.default;
}

function getBorderColor(type: string, scheme: string | null | undefined) {
	const isDark = scheme === 'dark';
	const map: any = isDark
		? {
				success: 'border-green-600',
				warning: 'border-yellow-600',
				info: 'border-blue-600',
				default: 'border-gray-600',
			}
		: {
				success: 'border-green-400',
				warning: 'border-yellow-400',
				info: 'border-blue-400',
				default: 'border-gray-400',
			};
	return map[type] || map.default;
}

interface Notification {
	id: string;
	title: string;
	description: string;
	time: string;
	type: 'info' | 'warning' | 'success';
	category: 'system' | 'device' | 'promotion';
	read: boolean;
}

export default function NotificationsPage() {
	const insets = useSafeAreaInsets();
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const { notifications, deleteNotification, markAsRead } = useNotifications();

	// Tab 状态
	const [activeIndex, setActiveIndex] = useState(0);

	// 动画引用
	const scrollRef = useAnimatedRef<Reanimated.ScrollView>();

	const tabs = [
		{ id: 'all', label: t('notification-tab-all'), key: 'all' as const },
		{
			id: 'system',
			label: t('notification-tab-system'),
			key: 'system' as const,
		},
		{
			id: 'device',
			label: t('notification-tab-device'),
			key: 'device' as const,
		},
		{
			id: 'promotion',
			label: t('notification-tab-promotion'),
			key: 'promotion' as const,
		},
	];

	const indicatorStyle = useAnimatedStyle(() => {
		return {
			left: withTiming(`${activeIndex * 25}%`, { duration: 250 }),
		};
	});

	const handleTabPress = (index: number) => {
		setActiveIndex(index);
		scrollRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
	};

	const scrollHandler = useAnimatedScrollHandler({
		onMomentumEnd: (e) => {
			const index = Math.round(e.contentOffset.x / SCREEN_WIDTH);
			runOnJS(setActiveIndex)(index);
		},
	});

	return (
		<View className="flex-1 bg-white dark:bg-black">
			<Stack.Screen options={{ headerShown: false }} />
			<TopTitle title={t('notification-header-title')} showBack={true} />
			<View className="px-4 py-4">
				<View className="relative h-14 w-full flex-row rounded-full bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
					<Reanimated.View
						style={[
							{
								position: 'absolute',
								width: '25%',
								height: '100%',
								padding: 6,
							},
							indicatorStyle,
						]}
					>
						<View className="h-full w-full rounded-full bg-yellow-300 shadow-sm dark:bg-yellow-600" />
					</Reanimated.View>

					{tabs.map((tab, index) => {
						const isActive = activeIndex === index;
						return (
							<Pressable
								key={tab.id}
								onPress={() => handleTabPress(index)}
								className="z-10 flex-1 items-center justify-center rounded-full"
							>
								<Text
									className={`text-sm ${
										isActive
											? 'font-bold text-black dark:text-white'
											: 'font-medium text-gray-500 dark:text-gray-400'
									}`}
								>
									{tab.label}
								</Text>
							</Pressable>
						);
					})}
				</View>
			</View>
			<Reanimated.ScrollView
				ref={scrollRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				className="flex-1"
			>
				{tabs.map((tab) => {
					// 过滤数据
					const filteredData = notifications.filter((n) =>
						tab.key === 'all' ? true : n.category === tab.key
					);

					return (
						<View key={tab.key} style={{ width: SCREEN_WIDTH, flex: 1 }}>
							<ScrollView
								className="flex-1"
								contentContainerStyle={{
									paddingHorizontal: 16,
									paddingBottom: insets.bottom + 20,
								}}
							>
								{filteredData.length > 0 ? (
									filteredData.map((item) => (
										<View
											key={item.id}
											className="mb-3 overflow-hidden rounded-lg"
										>
											<ReanimatedSwipeable
												friction={2}
												rightThreshold={40}
												renderRightActions={(prog) => (
													<RightActions
														progress={prog}
														onDelete={() => deleteNotification(item.id)}
														deleteLabel={t('notification-delete')}
													/>
												)}
											>
												<Pressable
													onPress={() => markAsRead(item.id)}
													className={`rounded-lg border-l-4 p-4 ${getBackgroundColor(item.type, colorScheme)} ${getBorderColor(item.type, colorScheme)}`}
												>
													<View>
														<Text className="mb-1 text-base font-bold text-black dark:text-white">
															{item.title}
														</Text>
														<Text className="mb-2 text-sm text-gray-600 dark:text-gray-300">
															{item.description}
														</Text>
														<Text className="text-xs text-gray-500 dark:text-gray-400">
															{item.time}
														</Text>
													</View>
												</Pressable>
											</ReanimatedSwipeable>
										</View>
									))
								) : (
									<View className="items-center justify-center py-20">
										<BellOff
											size={32}
											color={colorScheme === 'dark' ? '#4b5563' : '#d1d5db'}
										/>
										<Text className="mt-4 text-gray-500 dark:text-gray-400">
											{t('notification-empty')}
										</Text>
									</View>
								)}
							</ScrollView>
						</View>
					);
				})}
			</Reanimated.ScrollView>
		</View>
	);
}
