import MenuList, { MenuItem } from "@/components/ui/menu-list";
import TopTitle from "@/components/ui/top-title";
import { Stack } from "expo-router";
import { Key, Lock, ShieldCheck, Smartphone } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function SecurityPage() {
  const securityItems: MenuItem[] = [
    {
      id: "1",
      icon: <Lock size={24} color="#666" />,
      title: "修改密码",
      subtitle: "更改登录密码",
    },
    {
      id: "2",
      icon: <Key size={24} color="#666" />,
      title: "支付密码",
      subtitle: "设置或修改支付密码",
    },
    {
      id: "3",
      icon: <Smartphone size={24} color="#666" />,
      title: "设备管理",
      subtitle: "管理已登录设备",
    },
    {
      id: "4",
      icon: <ShieldCheck size={24} color="#666" />,
      title: "隐私设置",
      subtitle: "管理隐私和权限",
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title="账户安全" showBack={true} />
      <ScrollView className="flex-1 bg-gray-100 dark:bg-black">
        <View className="px-4 mt-6">
          <MenuList items={securityItems} />
        </View>
      </ScrollView>
    </>
  );
}