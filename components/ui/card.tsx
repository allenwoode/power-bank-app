import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface CardProps {
	children: ReactNode;
	className?: string;
	variant?: 'default' | 'elevated';
	title?: string;
	icon?: ReactNode;
}

export default function Card({
	children,
	className = '',
	variant = 'default',
	title,
	icon,
}: CardProps) {
	const colorScheme = useColorScheme();
	const baseClasses = 'rounded-2xl overflow-hidden';
	const variantClasses = {
		default: 'bg-white/80 dark:bg-black/40',
		elevated: 'bg-white dark:bg-gray-800',
	};

	// 根据深色模式调整icon颜色
	const themedIcon =
		icon && React.isValidElement(icon)
			? React.cloneElement(icon as React.ReactElement<any>, {
					color: colorScheme === 'dark' ? 'white' : '#666',
				})
			: icon;

	return (
		<View className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
			{(title || icon) && (
				<View className="flex-row items-center border-b border-gray-200 px-4 py-2.5 dark:border-gray-700">
					{themedIcon}
					{title && (
						<Text className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
							{title}
						</Text>
					)}
				</View>
			)}
			{children}
		</View>
	);
}
