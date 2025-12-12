import { useColorScheme } from "@/hooks/use-color-scheme";
import { Battery } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";

const EasingStandard = Easing.out(Easing.exp);

export default function IntroPage1() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Animated.View
      entering={FadeInDown.duration(800).delay(200).easing(EasingStandard)}
      className="items-center mb-16"
    >
      <View className="w-32 h-32 rounded-full bg-black dark:bg-white items-center justify-center mb-8">
        <Battery
          size={64}
          color={isDark ? "black" : "white"}
          strokeWidth={2}
        />
      </View>
      <Text className="text-4xl font-black text-black dark:text-white mb-6 leading-tight tracking-tighter text-center">
        {t("intro-1-title") || "电池分析"}
      </Text>
      <Text className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed text-center px-4">
        {t("intro-1-desc") || "实时监控电池状态，了解充电宝的健康情况"}
      </Text>
    </Animated.View>
  );
}