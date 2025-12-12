import Card from "@/components/ui/card";
import TopTitle from "@/components/ui/top-title";
import { Stack } from "expo-router";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PasswordPage() {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    // TODO: Implement password change logic
    console.log("Password change requested");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopTitle title={t("settings-security-password-page-title")} showBack={true} />
      <ScrollView className="flex-1 bg-gray-100 dark:bg-black">
        <View className="px-4 mt-6">
          <Card
            variant="elevated"
            title={t("settings-security-password-page-title")}
            icon={<Lock size={18} />}
          >
            <View className="p-4">
              <Text className="text-base font-medium text-black dark:text-white mb-2">
                {t("settings-security-password-current")}
              </Text>
              <TextInput
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4 text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder={t("settings-security-password-current-placeholder")}
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              <Text className="text-base font-medium text-black dark:text-white mb-2">
                {t("settings-security-password-new")}
              </Text>
              <TextInput
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4 text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder={t("settings-security-password-new-placeholder")}
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <Text className="text-base font-medium text-black dark:text-white mb-2">
                {t("settings-security-password-confirm")}
              </Text>
              <TextInput
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-6 text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder={t("settings-security-password-confirm-placeholder")}
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                className="bg-blue-500 rounded-lg py-3 items-center"
                onPress={handleSave}
              >
                <Text className="text-white font-medium">
                  {t("settings-security-password-save")}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </>
  );
}