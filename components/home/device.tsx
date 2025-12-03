import { useRouter } from "expo-router";
import { LayoutGrid, LayoutList, Plus, Zap } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

interface DeviceItem {
  id: string;
  name: string;
  type: string;
  color: string;
}

const devices: DeviceItem[] = [
  { id: "1", name: "迷你充电宝", type: "5000mAh", color: "#3B82F6" },
  { id: "2", name: "中容量充电宝", type: "10000mAh", color: "#10B981" },
  { id: "3", name: "大容量充电宝", type: "20000mAh", color: "#F59E0B" },
  { id: "4", name: "超大容量充电宝", type: "30000mAh", color: "#EF4444" },
];

export function Device() {
  const router = useRouter();

  const [isGridView, setIsGridView] = useState<boolean>(true);

  const renderDeviceCard = ({ item }: { item: DeviceItem }) => (
    <Pressable
      onPress={() => router.push(`/device/${item.id}`)}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={{
        width: isGridView ? "46%" : "96%",
        marginHorizontal: "auto",
        marginVertical: 8,
      }}
    >
      <View
        className="rounded-2xl p-4 items-center justify-center"
        style={{
          backgroundColor: item.color,
          height: 140,
        }}
      >
        <Zap size={32} color="white" />
        <Text className="text-white text-base font-semibold mt-2">
          {item.name}
        </Text>
        <Text className="text-white/80 text-xs mt-1">{item.type}</Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-semibold text-black dark:text-white">
          我的设备
        </Text>
        <View className="flex-row items-center justify-center gap-4">
          <Pressable onPress={() => router.push("/device/add")}>
            <Plus size={28} color="black" />
          </Pressable>
          <Pressable onPress={() => setIsGridView(!isGridView)}>
            {isGridView ? (
              <LayoutGrid size={24} color="black" />
            ) : (
              <LayoutList size={24} color="black" />
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1">
        <FlatList
          key={isGridView ? "grid" : "list"}
          data={devices}
          renderItem={renderDeviceCard}
          keyExtractor={(item) => item.id}
          numColumns={isGridView ? 2 : 1}
          scrollEnabled={false}
          contentContainerStyle={{
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
        />
      </ScrollView>
    </View>
  );
}
