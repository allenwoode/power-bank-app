import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useRef, useState } from 'react';
import {
	Dimensions,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Text,
	View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface BannerItem {
	id: string;
	title: string;
	subtitle: string;
	color: string;
}

const bannerData: BannerItem[] = [
	{
		id: '1',
		title: '',
		subtitle: '',
		color: '#FF6B6B',
	},
	{
		id: '2',
		title: '',
		subtitle: '',
		color: '#4ECDC4',
	},
	{
		id: '3',
		title: '',
		subtitle: '',
		color: '#1A535C',
	},
];

export default function Banner() {
	const [activeIndex, setActiveIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);
	const colorScheme = useColorScheme();

	useEffect(() => {
		const interval = setInterval(() => {
			const nextIndex = (activeIndex + 1) % bannerData.length;
			setActiveIndex(nextIndex);
			flatListRef.current?.scrollToIndex({
				index: nextIndex,
				animated: true,
				viewPosition: 0.5,
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [activeIndex]);

	const renderItem = ({ item }: { item: BannerItem }) => (
		<View
			className="items-center justify-center rounded-2xl p-6"
			style={{
				backgroundColor: item.color,
				height: 200,
				width: width - 32,
				marginHorizontal: 16,
			}}
		>
			<Text className="mb-2 text-2xl font-bold text-white">{item.title}</Text>
			<Text className="text-base text-white">{item.subtitle}</Text>
		</View>
	);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / (width - 32 + 32));
		setActiveIndex(Math.max(0, Math.min(currentIndex, bannerData.length - 1)));
	};

	return (
		<View className="mt-4">
			<FlatList
				className="rounded-2xl"
				ref={flatListRef}
				data={bannerData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal
				scrollEventThrottle={16}
				onScroll={handleScroll}
				showsHorizontalScrollIndicator={false}
				scrollEnabled={true}
				snapToAlignment="center"
				decelerationRate="fast"
				snapToInterval={width}
			/>

			{/* 指示点 */}
			<View className="mt-4 flex-row items-center justify-center gap-2">
				{bannerData.map((_, index) => (
					<View
						key={index}
						className={`rounded-full ${
							index === activeIndex
								? colorScheme === 'dark'
									? 'bg-white'
									: 'bg-gray-800'
								: colorScheme === 'dark'
									? 'bg-gray-400'
									: 'bg-gray-300'
						}`}
						style={{
							width: index === activeIndex ? 8 : 6,
							height: 6,
						}}
					/>
				))}
			</View>
		</View>
	);
}
