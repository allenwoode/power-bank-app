import { Check } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
    <View className="p-4 mb-4">
      {(title || icon) && (
        <View className="flex-row items-center mb-4">
          {icon}
          {title && (
            <Text className="text-lg font-semibold ml-2 text-gray-900 dark:text-white">
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
            className={`flex-row items-center justify-between p-3 rounded-lg ${
              !isLast ? "mb-2" : ""
            } ${
              isSelected
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            <View>
              <Text
                className={`text-base ${
                  isSelected
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {option.title}
              </Text>
              {option.description && (
                <Text
                  className={`text-sm mt-1 ${
                    isSelected
                      ? "text-blue-500 dark:text-blue-300"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {option.description}
                </Text>
              )}
            </View>
            {isSelected && (
              <View className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Check color="white" size={14} />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
