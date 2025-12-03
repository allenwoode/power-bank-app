import MenuList, { MenuItem } from "@/components/ui/menu-list";
import TopTitle from "@/components/ui/top-title";
import { Stack } from "expo-router";
import { Mail, MapPin, Phone, User } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function ProfilePage() {
  const profileItems: MenuItem[] = [
    {
      id: "1",
      icon: <User size={24} color="#666" />,
      title: "用户名",
      subtitle: "修改用户名",
    },
    {
      id: "2",
      icon: <Mail size={24} color="#666" />,
      title: "邮箱",
      subtitle: "user@example.com",
    },
    {
      id: "3",
      icon: <Phone size={24} color="#666" />,
      title: "手机号",
      subtitle: "138****8888",
    },
    {
      id: "4",
      icon: <MapPin size={24} color="#666" />,
      title: "地址",
      subtitle: "管理收货地址",
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title="个人信息" showBack={true} />
      <ScrollView className="flex-1 bg-gray-100 dark:bg-black">
        <View className="px-4 mt-6">
          <MenuList items={profileItems} />
        </View>
      </ScrollView>
    </>
  );
}
