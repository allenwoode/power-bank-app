import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TopTitleProps {
  title: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
  backgroundColor?: string;
}

export default function TopTitle({
  title,
  showBack = true,
  rightContent,
  backgroundColor = "bg-white",
}: TopTitleProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isBackPressed, setIsBackPressed] = useState(false);

  return (
    <>
      <View
        className={`absolute top-0 left-0 right-0 z-50 px-4 py-4 flex-row items-center justify-between border-b border-gray-200 ${backgroundColor}`}
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center gap-3 flex-1">
          {showBack && (
            <Pressable
              onPress={() => router.back()}
              onPressIn={() => setIsBackPressed(true)}
              onPressOut={() => setIsBackPressed(false)}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
              className={`rounded-full`}
            >
              <ArrowLeft size={24} color="black" />
            </Pressable>
          )}
          <Text className="text-2xl font-bold text-black">{title}</Text>
        </View>
        {rightContent && (
          <View className="flex-row items-center gap-2">{rightContent}</View>
        )}
      </View>
      <View style={{ height: insets.top + 40 }} />
    </>
  );
}
