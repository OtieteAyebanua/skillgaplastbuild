import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SessionUser } from "@/services/user";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import SplashScreen from "./(tabs)/splashScreen";

export default function RootLayout() {
  const colorScheme = SessionUser?.preferences.darkMode;
  const [one, setOne] = useState<number>(4);
  const [appKey, setAppKey] = useState(0);
  const [refreshApp, setRefreshApp] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOne(0);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  if (refreshApp) {
    setAppKey((prev) => prev + 1); // forces remount
  }
}, [SessionUser]);

  if (one != 0) {
    return <SplashScreen/>;
  }

  return (
    <ThemeProvider key={appKey} value={colorScheme === true ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast/>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
