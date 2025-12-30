import { useNotifications } from '@/context/notification-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDebouncedNavigation } from '@/hooks/use-debounced-navigation';
import { Bell, CircleUser } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme();
	const { unreadCount } = useNotifications();

	const { t } = useTranslation();
	const { push } = useDebouncedNavigation(500);
	return (
		<View
			className="flex-row items-center justify-between p-4"
			style={{ paddingTop: insets.top + 25, paddingBottom: insets.bottom }}
		>
			<Pressable
				onPress={() => {
					push('/(auth)/login');
				}}
				className="flex gap-2"
			>
				<View className="flex-row items-center justify-start gap-2">
					<CircleUser
						size={24}
						color={colorScheme === 'dark' ? 'white' : 'black'}
					/>
					<Text className="text-2xl font-bold text-black dark:text-white">
						{t('header-title')}
					</Text>
				</View>

				<View className="flex items-center justify-start">
					<Text className="text-sm text-gray-800 dark:text-white">
						{t('header-subtitle')}
					</Text>
				</View>
			</Pressable>

			<View className="flex-row items-center justify-center gap-4">
				{/* <Pressable
          onPress={() => router.push("/notifications")}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
          className="p-2 rounded-full"
        >
          <Plus size={28} color="black" />
        </Pressable> */}
				<Pressable
					onPress={() => push('/notifications')}
					android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: true }}
					className="relative rounded-full p-2"
				>
					<Bell size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />

					{unreadCount > 0 && (
						<View
							className="absolute h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 dark:border-black"
							style={{
								right: 6,
								top: 4,
								position: 'absolute',
							}}
						>
							<Text className="text-center text-xs font-bold text-white">
								{unreadCount > 9 ? '9+' : unreadCount.toString()}
							</Text>
						</View>
					)}
				</Pressable>
			</View>
		</View>
	);
}
