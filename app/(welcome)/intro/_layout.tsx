import { useOnboarding } from "@/context/onboarding-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useDebouncedNavigation } from "@/hooks/use-debounced-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useSegments } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
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

const introPages = ["intro-1", "intro-2", "intro-3"];

export default function IntroLayout() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { setHasSeenIntro } = useOnboarding();
  const { replace } = useDebouncedNavigation(500);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const segments = useSegments();

  // segments: ["(welcome)", "intro", "intro-1"]
  const currentIntroPage = segments[2];

  const handleNext = async () => {
    if (currentIntroPage) {
      const currentIndex = introPages.indexOf(currentIntroPage);
      if (currentIndex < introPages.length - 1) {
        replace(`(welcome)/intro/${introPages[currentIndex + 1]}`);
      } else if (currentIndex === introPages.length - 1) {
        try {
          await AsyncStorage.setItem("hasSeenIntro", "true");
          setHasSeenIntro(true);
          // @ts-ignore
          replace("/(tabs)");
        } catch (error) {
          console.error("保存状态失败:", error);
          setHasSeenIntro(true);
          // @ts-ignore
          replace("/(tabs)");
        }
      }
    }
  };

  const handleBack = () => {
    if (currentIntroPage) {
      const currentIndex = introPages.indexOf(currentIntroPage);
      if (currentIndex > 0) {
        // @ts-ignore
        replace(`(welcome)/intro/${introPages[currentIndex - 1]}`);
      }
    }
  };

  const getNextText = () => {
    if (currentIntroPage === "intro-3") {
      return t("intro-start") || "开始体验";
    }
    return t("intro-next") || "下一步";
  };

  const showBackButton = currentIntroPage !== "intro-1";

  return (
    <View
      className="flex-1 bg-white dark:bg-black relative"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}
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
        <View className="flex-row justify-end items-center pt-6"></View>

        <View className="flex-1 justify-center">
          <Slot />
        </View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(600).easing(EasingStandard)}
          className="pb-8"
        >
          <View className="flex-row items-center" style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleBack}
              disabled={!showBackButton}
              activeOpacity={0.9}
              className="h-16 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex-row items-center justify-center px-6"
              style={[
                {
                  opacity: showBackButton ? 1 : 0,
                  flex: 1,
                },
                Platform.select({
                  android: { elevation: showBackButton ? 4 : 0 },
                }),
              ]}
            >
              <ChevronLeft size={24} color={isDark ? "#d1d5db" : "#6b7280"} />
              <Text className="text-gray-600 dark:text-gray-300 text-lg font-medium tracking-wide ml-2">
                {t("intro-back") || "上一步"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.9}
              className="h-16 flex-1 rounded-2xl bg-black dark:bg-white flex-row items-center justify-center px-6"
            >
              <Text className="text-white dark:text-black text-lg font-bold tracking-wide">
                {getNextText()}
              </Text>
              <ChevronRight
                size={24}
                color={isDark ? "black" : "white"}
                className="ml-2"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
