import MenuList, { MenuItem } from "@/components/ui/menu-list";
import TopTitle from "@/components/ui/top-title";
import { Stack } from "expo-router";
import { Globe, Info, Palette, Zap } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function AppSettingPage() {
  const settingsItems: MenuItem[] = [
    {
      id: "1",
      icon: <Palette size={24} color="#666" />,
      title: "主题",
      subtitle: "切换应用主题",
    },
    {
      id: "2",
      icon: <Globe size={24} color="#666" />,
      title: "语言",
      subtitle: "选择应用语言",
    },
    {
      id: "3",
      icon: <Zap size={24} color="#666" />,
      title: "性能",
      subtitle: "优化应用性能",
    },
    {
      id: "4",
      icon: <Info size={24} color="#666" />,
      title: "关于",
      subtitle: "应用版本和信息",
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title="应用设置" showBack={true} />
      <ScrollView className="flex-1 bg-gray-100 dark:bg-black">
        <View className="px-4 mt-6">
          <MenuList items={settingsItems} />
        </View>
      </ScrollView>
    </>
  );
}
