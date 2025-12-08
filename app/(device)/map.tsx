import AMapWebView from "@/components/amap-view";
import TopTitle from "@/components/ui/top-title";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapPage() {
  const { lng, lat } = useLocalSearchParams<{ lng: string; lat: string }>();
  const [location, setLocation] = useState({ lng: parseFloat(lng || "120.123"), lat: parseFloat(lat || "30.456") });
  const insets = useSafeAreaInsets();

  return (
    <>
      <TopTitle title="设备位置" showBack={true} />

      <View className="flex-1">
        <AMapWebView
          coord={location}
          onCoordinateChange={setLocation}
        />

        {/* 底部悬浮 */}
        <View
          style={{ bottom: insets.bottom + 15 }}
          className="absolute left-4 right-4 bg-white rounded-xl p-4 shadow-lg"
        >
          <Text className="text-base font-medium text-gray-800">
            当前中心点坐标
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            经度：{location.lng}
          </Text>
          <Text className="text-sm text-gray-600">纬度：{location.lat}</Text>
        </View>
      </View>
    </>
  );
}
