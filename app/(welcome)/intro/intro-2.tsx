import { useColorScheme } from '@/hooks/use-color-scheme';
import { Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

const EasingStandard = Easing.out(Easing.exp);

export default function IntroPage2() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';

	return (
		<Animated.View
			entering={FadeInDown.duration(800).delay(200).easing(EasingStandard)}
			className="mb-16 items-center"
		>
			<View className="mb-8 h-32 w-32 items-center justify-center rounded-full bg-black dark:bg-white">
				<Sparkles
					size={64}
					color={isDark ? 'black' : 'white'}
					strokeWidth={2}
				/>
			</View>
			<Text className="mb-6 text-center text-4xl font-black leading-tight tracking-tighter text-black dark:text-white">
				{t('intro-2-title')}
			</Text>
			<Text className="px-4 text-center text-lg leading-relaxed text-gray-500 dark:text-gray-300">
				{t('intro-2-desc')}
			</Text>
		</Animated.View>
	);
}
