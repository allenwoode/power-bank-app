import TopTitle from "@/components/ui/top-title";
import { Stack, useLocalSearchParams } from "expo-router";
import { Battery, Clock, Droplet, Thermometer, Zap } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DeviceDetail {
  id: string;
  name: string;
  type: string;
  color: string;
  capacity: string;
  battery: number;
  voltage: string;
  temperature: string;
  usageTime: string;
  lastCharged: string;
}

const deviceDetails: Record<string, DeviceDetail> = {
  "1": {
    id: "1",
    name: "迷你充电宝",
    type: "5000mAh",
    color: "#3B82F6",
    capacity: "5000mAh",
    battery: 85,
    voltage: "5V/2A",
    temperature: "25°C",
    usageTime: "2小时",
    lastCharged: "2小时前",
  },
  "2": {
    id: "2",
    name: "中容量充电宝",
    type: "10000mAh",
    color: "#10B981",
    capacity: "10000mAh",
    battery: 60,
    voltage: "5V/2A",
    temperature: "28°C",
    usageTime: "4小时",
    lastCharged: "1天前",
  },
  "3": {
    id: "3",
    name: "大容量充电宝",
    type: "20000mAh",
    color: "#F59E0B",
    capacity: "20000mAh",
    battery: 92,
    voltage: "5V/3A",
    temperature: "24°C",
    usageTime: "8小时",
    lastCharged: "3小时前",
  },
  "4": {
    id: "4",
    name: "超大容量充电宝",
    type: "30000mAh",
    color: "#EF4444",
    capacity: "30000mAh",
    battery: 100,
    voltage: "5V/3A",
    temperature: "22°C",
    usageTime: "12小时",
    lastCharged: "30分钟前",
  },
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <View className="flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg mb-4">
      <View className="w-12 h-12 bg-gray-200 rounded-lg items-center justify-center flex-shrink-0">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-500 mb-2">{label}</Text>
        <Text className="text-base font-semibold text-black">{value}</Text>
      </View>
    </View>
  );
}

export default function DeviceDetailPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const deviceId = id || "1";
  const device = deviceDetails[deviceId];

  if (!device) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg text-gray-500">设备未找到</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title={device.name} showBack={true} />
      <View className="flex-1 bg-white">
        {/* Device Card */}
        <View className="p-4">
          <View
            className="rounded-2xl p-8 items-center justify-center mb-6"
            style={{
              backgroundColor: device.color,
              height: 200,
            }}
          >
            <Zap size={48} color="white" />
            <Text className="text-white text-2xl font-bold mt-4">
              {device.name}
            </Text>
            <Text className="text-white/80 text-lg mt-2">{device.type}</Text>
          </View>

          {/* Battery Status */}
          <View className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm text-gray-600">电量状态</Text>
              <Text className="text-sm font-bold text-blue-600">
                {device.battery}%
              </Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${device.battery}%` }}
              />
            </View>
          </View>
        </View>

        <View className="px-4">
          <Text className="text-2xl font-bold text-black mb-4">设备详情</Text>
        </View>

        {/* Details Section */}
        <ScrollView className="flex-1" style={{ paddingBottom: insets.bottom }}>
          <View className="p-4">
            <DetailItem
              icon={<Battery size={20} color="black" />}
              label="容量"
              value={device.capacity}
            />

            <DetailItem
              icon={<Zap size={20} color="black" />}
              label="输出电压"
              value={device.voltage}
            />

            <DetailItem
              icon={<Thermometer size={20} color="black" />}
              label="当前温度"
              value={device.temperature}
            />

            <DetailItem
              icon={<Clock size={20} color="black" />}
              label="使用时长"
              value={device.usageTime}
            />

            <DetailItem
              icon={<Droplet size={20} color="black" />}
              label="最后充电"
              value={device.lastCharged}
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View
          className="gap-3 p-4 border-t border-gray-200"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          {/* <Pressable className="bg-blue-500 rounded-lg p-4 items-center">
            <Text className="text-white font-semibold text-base">
              重新配对
            </Text>
          </Pressable> */}
          <Pressable className="bg-gray-100 rounded-lg p-4 items-center">
            <Text className="text-black font-semibold text-base">移除设备</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
