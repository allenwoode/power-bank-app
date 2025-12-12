declare module 'react-native-snap-carousel' {
	import { ReactNode } from 'react';
	import { ViewProps } from 'react-native';

	export interface CarouselProps<T> extends ViewProps {
		data: T[];
		renderItem: (item: { item: T; index: number }) => ReactNode;
		sliderWidth: number;
		itemWidth: number;
		onSnapToItem?: (index: number) => void;
		autoplay?: boolean;
		autoplayInterval?: number;
		loop?: boolean;
		scrollEnabled?: boolean;
		activeSlideAlignment?: 'center' | 'start' | 'end';
		inactiveSlideScale?: number;
		inactiveSlideOpacity?: number;
	}

	export default class Carousel<T> extends React.Component<CarouselProps<T>> {}
}
