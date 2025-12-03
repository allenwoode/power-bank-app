import TopTitle from "@/components/ui/top-title";
import { Stack, useRouter } from "expo-router";
import { Bluetooth, Plus } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddDevicePage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (isScanning) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1.8,
              duration: 1500,
              useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: false,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: false,
            }),
          ]),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isScanning, scaleAnim, opacityAnim]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title="添加设备" showBack={true} />

      <View className="flex-1 py-4 bg-gray-100 dark:bg-black items-center justify-center">
        {/* 扫描动画区域 */}
        <View
          className="items-center justify-center mb-16"
          style={{ marginTop: -(insets.top + 40) }}
        >
          {/* 脉冲波纹 */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "#FBBF24",
              position: "absolute",
            }}
          />

          {/* 中心图标 */}
          <View className="items-center justify-center w-40 h-40 rounded-full bg-yellow-300 dark:bg-yellow-400">
            <Bluetooth size={60} color="white" strokeWidth={1.5} />
          </View>
        </View>

        {/* 文字说明 */}
        <Text className="text-2xl font-bold text-black dark:text-white mb-2">
          正在扫描附近的设备
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400 text-center px-6 mb-12">
          请确保您的充电宝蓝牙已开启
        </Text>

        {/* 底部选项 */}
        <View className="px-4 w-full">
          <View className="bg-white/80 dark:bg-black/40 rounded-2xl overflow-hidden">
            <Pressable
              className="flex-row items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700"
              android_ripple={{ color: "rgba(0, 0, 0, 0.05)" }}
              onPress={() => setIsScanning(!isScanning)}
            >
              <View className="w-12 h-12 rounded-full bg-blue-300 items-center justify-center mr-4">
                <Bluetooth size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-black dark:text-white">
                  {isScanning ? "停止扫描" : "开始扫描"}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isScanning ? "点击停止蓝牙扫描" : "重新启动蓝牙扫描"}
                </Text>
              </View>
            </Pressable>

            <Pressable
              className="flex-row items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700"
              android_ripple={{ color: "rgba(0, 0, 0, 0.05)" }}
            >
              <View className="w-12 h-12 rounded-full bg-purple-300 items-center justify-center mr-4">
                <Plus size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-black dark:text-white">
                  手动添加
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  输入设备序列号或名称
                </Text>
              </View>
            </Pressable>

            <Pressable
              className="flex-row items-center px-4 py-4"
              android_ripple={{ color: "rgba(0, 0, 0, 0.05)" }}
            >
              <View className="w-12 h-12 rounded-full bg-amber-300 items-center justify-center mr-4">
                <Bluetooth size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-black dark:text-white">
                  已配对设备
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  从已配对列表中选择
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
