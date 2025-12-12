import { Check } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface SelectOption<T extends string = string> {
	id: T;
	title: string;
	description?: string;
}

interface RadioSelectProps<T extends string = string> {
	options: SelectOption<T>[];
	selectedId: T | null;
	onSelect: (id: T) => void;
	title?: string;
	icon?: React.ReactNode;
}

export default function RadioSelect<T extends string = string>({
	options,
	selectedId,
	onSelect,
	title,
	icon,
}: RadioSelectProps<T>) {
	return (
		<View className="mb-4 p-4">
			{(title || icon) && (
				<View className="mb-4 flex-row items-center">
					{icon}
					{title && (
						<Text className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
							{title}
						</Text>
					)}
				</View>
			)}

			{options.map((option, index) => {
				const isSelected = selectedId === option.id;
				const isLast = index === options.length - 1;
				return (
					<TouchableOpacity
						key={option.id}
						onPress={() => onSelect(option.id)}
						className={`flex-row items-center justify-between rounded-lg p-3 ${
							!isLast ? 'mb-2' : ''
						} ${
							isSelected
								? 'border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
								: 'border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700'
						}`}
					>
						<View>
							<Text
								className={`text-base ${
									isSelected
										? 'text-blue-600 dark:text-blue-400'
										: 'text-gray-700 dark:text-gray-300'
								}`}
							>
								{option.title}
							</Text>
							{option.description && (
								<Text
									className={`mt-1 text-sm ${
										isSelected
											? 'text-blue-500 dark:text-blue-300'
											: 'text-gray-500 dark:text-gray-400'
									}`}
								>
									{option.description}
								</Text>
							)}
						</View>
						{isSelected && (
							<View className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
								<Check color="white" size={14} />
							</View>
						)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
