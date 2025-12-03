import TopTitle from "@/components/ui/top-title";
import { Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "info" | "warning" | "success";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "充电完成",
    description: "您的充电宝已充满电，可以使用了",
    time: "2 小时前",
    type: "success",
  },
  {
    id: "2",
    title: "低电量提醒",
    description: "您的便携电源电量已降至 20%，请及时充电",
    time: "4 小时前",
    type: "warning",
  },
  {
    id: "3",
    title: "系统更新",
    description: "新版本已推出，点击更新获得更多功能",
    time: "1 天前",
    type: "info",
  },
  {
    id: "4",
    title: "设备已连接",
    description: "新设备 便携电源 已成功连接",
    time: "2 天前",
    type: "success",
  },
];

function getBackgroundColor(type: string): string {
  switch (type) {
    case "success":
      return "bg-green-50";
    case "warning":
      return "bg-yellow-50";
    case "info":
      return "bg-blue-50";
    default:
      return "bg-gray-50";
  }
}

function getBorderColor(type: string): string {
  switch (type) {
    case "success":
      return "border-l-4 border-green-400";
    case "warning":
      return "border-l-4 border-yellow-400";
    case "info":
      return "border-l-4 border-blue-400";
    default:
      return "border-l-4 border-gray-400";
  }
}

export default function NotificationsPage() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<
    "all" | "system" | "device" | "promotion"
  >("all");

  const tabs = [
    { id: "all", label: "全部通知", key: "all" as const },
    { id: "system", label: "系统通知", key: "system" as const },
    { id: "device", label: "设备通知", key: "device" as const },
    { id: "promotion", label: "优惠通知", key: "promotion" as const },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title="通知" showBack={true} />
      <View className="flex-1 bg-white">
        <View className="px-4 py-3">
          {/* 分类选项卡 */}
          <View className="flex-row gap-2">
            {tabs.map((tab) => (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.key)}
                className={` mt-2 flex-1 py-4 rounded-full items-center justify-center ${
                  activeTab === tab.key ? "bg-yellow-300" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    activeTab === tab.key ? "text-black" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <ScrollView className="flex-1 bg-white">
          {/* Notifications List */}
          <View
            className="p-4 gap-3"
            style={{ paddingBottom: insets.bottom + 20 }}
          >
            {mockNotifications.length > 0 ? (
              mockNotifications.map((notification) => (
                <Pressable
                  key={notification.id}
                  className={`p-4 rounded-lg ${getBackgroundColor(notification.type)} ${getBorderColor(notification.type)}`}
                  onPress={() => {}}
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-base font-bold text-black mb-1">
                        {notification.title}
                      </Text>
                      <Text className="text-sm text-gray-600 mb-2">
                        {notification.description}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {notification.time}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <View className="items-center justify-center py-12">
                <Text className="text-lg text-gray-500">暂无通知</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
