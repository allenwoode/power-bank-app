import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Appearance, useColorScheme as useRNColorScheme } from "react-native";

export function useColorScheme() {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const systemColorScheme = useRNColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("themePreference");
        if (storedTheme === "dark" || storedTheme === "light") {
          setColorScheme(storedTheme);
          Appearance.setColorScheme(storedTheme);
        } else {
          setColorScheme("system");
          Appearance.setColorScheme(null);
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return systemColorScheme;
  }

  return colorScheme ?? systemColorScheme;
}
