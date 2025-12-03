import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? "light"];

  // 橙色主题配色
  const orangeTheme = {
    active: "#FF6B35", // 活跃状态 - 鲜橙色
    inactive: colorScheme === "dark" ? "#94A3B8" : "#64748B", // 未激活状态 - 灰色
    background: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF", // 背景色
    activeBg: colorScheme === "dark" ? "#FF6B3515" : "#FF6B3510", // 活跃背景
    border: colorScheme === "dark" ? "#2D2D2D" : "#F1F5F9", // 边框色
    shadow: "rgba(255, 107, 53, 0.15)", // 阴影色
  };

  return (
    <View
      className="border-t bg-white dark:bg-[#1A1A1A]"
      style={{
        paddingBottom: insets.bottom,
        borderTopColor: orangeTheme.border,
        shadowColor: orangeTheme.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View className="flex-row items-center justify-around pt-2 pb-1">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // 强制传递正确的颜色和聚焦状态
          const icon = options.tabBarIcon?.({
            color: isFocused ? orangeTheme.active : orangeTheme.inactive,
            size: 28,
            focused: isFocused,
          });

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center py-1"
              android_ripple={{
                color: "rgba(255, 107, 53, 0.15)",
                borderless: true,
                radius: 40,
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View className="h-8 items-center justify-center rounded-2xl">
                {icon}
              </View>
              <Text
                className="text-xs font-medium mt-1"
                style={{
                  color: isFocused ? orangeTheme.active : orangeTheme.inactive,
                  fontWeight: isFocused ? "600" : "400",
                }}
                numberOfLines={1}
              >
                {options.title ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
