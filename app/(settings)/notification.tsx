import MenuList, { MenuItem } from "@/components/ui/menu-list";
import TopTitle from "@/components/ui/top-title";
import { Stack } from "expo-router";
import { Bell, Mail, MessageSquare, Volume2 } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function NotificationPage() {
  const notificationItems: MenuItem[] = [
    {
      id: "1",
      icon: <Bell size={24} color="#666" />,
      title: "推送通知",
      subtitle: "接收应用推送消息",
    },
    {
      id: "2",
      icon: <Mail size={24} color="#666" />,
      title: "邮件通知",
      subtitle: "接收邮件提醒",
    },
    {
      id: "3",
      icon: <MessageSquare size={24} color="#666" />,
      title: "短信通知",
      subtitle: "接收短信提醒",
    },
    {
      id: "4",
      icon: <Volume2 size={24} color="#666" />,
      title: "声音和震动",
      subtitle: "设置提示音和震动",
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title="通知设置" showBack={true} />
      <ScrollView className="flex-1 bg-gray-100 dark:bg-black">
        <View className="px-4 mt-6">
          <MenuList items={notificationItems} />
        </View>
      </ScrollView>
    </>
  );
}