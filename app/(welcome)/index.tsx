import { useOnboarding } from "@/context/onboarding-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useDebouncedNavigation } from "@/hooks/use-debounced-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronRight, Zap } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const EasingStandard = Easing.out(Easing.exp);

export default function WelcomePage() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { push, replace } = useDebouncedNavigation(500);
  const { setHasSeenIntro } = useOnboarding();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleFinish = async (path: string) => {
    // 如果是跳转到 intro，不需要设置 hasSeenIntro
    if (path.includes("intro")) {
      // @ts-ignore
      push(path);
      return;
    }

    // 如果是跳过（跳转到 tabs），则设置 hasSeenIntro
    try {
      await AsyncStorage.setItem("hasSeenIntro", "true");
      setHasSeenIntro(true);
      // @ts-ignore
      replace(path);
    } catch (error) {
      console.error("保存状态失败:", error);
      setHasSeenIntro(true);
      // @ts-ignore
      replace(path);
    }
  };

  return (
    <View
      className="flex-1 bg-white dark:bg-black relative"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 50 }}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View className="absolute inset-0 overflow-hidden" pointerEvents="none">
        <Animated.View
          style={[
            { position: "absolute", top: -width * 0.3, right: -width * 0.2 },
          ]}
        >
          <View className="w-[500px] h-[500px] rounded-full bg-gray-100 dark:bg-zinc-900/40 opacity-60" />
        </Animated.View>
        <Animated.View
          style={[
            { position: "absolute", bottom: -width * 0.2, left: -width * 0.3 },
          ]}
        >
          <View className="w-[400px] h-[400px] rounded-full bg-gray-200/50 dark:bg-zinc-800/30 opacity-60" />
        </Animated.View>
      </View>

      <View className="flex-1 z-10 flex-col justify-between px-8">
        <View className="flex-row justify-between items-center pt-6">
          <Animated.View
            entering={FadeInDown.duration(600).easing(EasingStandard)}
          >
            <View className="w-10 h-10 bg-black dark:bg-white rounded-lg items-center justify-center">
              <Zap
                size={20}
                color={isDark ? "black" : "white"}
                fill={isDark ? "black" : "white"}
              />
            </View>
          </Animated.View>

          <TouchableOpacity
            onPress={() => handleFinish("/(tabs)")}
            className="py-2"
          >
            <Text className=" text-gray-500 dark:text-gray-400 font-medium text-base tracking-wide">
              {t("welcome-skip")}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-center -mt-10">
          <Animated.View
            entering={FadeInDown.duration(800)
              .delay(200)
              .easing(EasingStandard)}
          >
            <Text className="text-4xl font-black text-black dark:text-white mb-6 leading-tight tracking-tighter">
              {t("welcome-title")}
            </Text>
            <Text className="text-lg text-gray-500 dark:text-gray-400 mb-12 leading-relaxed max-w-[90%]">
              {t("welcome-subtitle")}
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(800)
              .delay(400)
              .easing(EasingStandard)}
            className="flex flex-col gap-y-8 pl-1"
          >
            <MinimalFeature
              icon={
                <Zap
                  size={20}
                  color={isDark ? "white" : "black"}
                  fill={isDark ? "black" : "white"}
                />
              }
              title={t("welcome-feature-1-title")}
              delay={0}
            />
            <MinimalFeature
              icon={
                <Zap
                  size={20}
                  color={isDark ? "white" : "black"}
                  fill={isDark ? "black" : "white"}
                />
              }
              title={t("welcome-feature-2-title")}
              delay={100}
            />
            <MinimalFeature
              icon={
                <Zap
                  size={20}
                  color={isDark ? "white" : "black"}
                  fill={isDark ? "black" : "white"}
                />
              }
              title={t("welcome-feature-3-title")}
              delay={200}
            />
          </Animated.View>
        </View>
        <Animated.View
          entering={FadeInDown.duration(800).delay(600).easing(EasingStandard)}
          className="pb-8"
        >
          <TouchableOpacity
            onPress={() => handleFinish("intro/intro-1")}
            activeOpacity={0.9}
            className="w-full h-16 bg-black dark:bg-white rounded-none flex-row items-center justify-between px-6 mb-6"
            style={[
              { borderRadius: 16 },
              Platform.select({
                ios: {
                  shadowColor: isDark ? "#fff" : "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 5 },
                },
                android: { elevation: 8 },
              }),
            ]}
          >
            <Text className="text-white dark:text-black text-lg font-bold tracking-wide">
              {t("welcome-get-started")}
            </Text>
            <ChevronRight size={24} color={isDark ? "black" : "white"} />
          </TouchableOpacity>

          {/* <View className="flex-row items-center ml-1">
            <Text className="text-gray-500 dark:text-gray-500 text-sm mr-2">
              {t("welcome-footer")}
            </Text>
            <TouchableOpacity onPress={() => handleFinish("/(auth)/login")}>
              <Text className="text-black dark:text-white font-bold text-sm underline decoration-2">
                {t("welcome-sign-in")}
              </Text>
            </TouchableOpacity>
          </View> */}
        </Animated.View>
      </View>
    </View>
  );
}

function MinimalFeature({
  title,
  delay,
  icon,
}: {
  title: string;
  delay: number;
  icon?: React.ReactNode;
}) {
  return (
    <Animated.View className="flex items-start">
      <View className="flex-row items-center">
        <View className="rounded-lg p-1 bg-gray-200/50 dark:bg-zinc-800/30 items-center justify-center mr-2">
          {icon}
        </View>
        <Text className="text-lg ml-2 font-medium  text-gray-900 dark:text-gray-100 tracking-tight">
          {title}
        </Text>
      </View>
    </Animated.View>
  );
}
