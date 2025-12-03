import Banner from "@/components/home/banner";
import { Device } from "@/components/home/device";
import Header from "@/components/home/header";

import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#FBBF24", "#FCD34D", "#ffffff"]}
      locations={[0, 0.3, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      className="flex-1"
    >
      <View className="flex-1">
        <Header />
        <View className="px-4 flex-shrink">
          <Banner />
        </View>
        <View className="flex-1">
          <Device />
        </View>
      </View>
    </LinearGradient>
  );
}
