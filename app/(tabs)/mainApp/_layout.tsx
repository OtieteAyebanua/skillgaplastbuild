import { Tabs } from "expo-router";
import React, { ReactNode, useEffect } from "react";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthSession } from "@/services/authSession";
import { Logger } from "@/services/logger";
import { Router } from "@/services/router";
import { SessionUser, User } from "@/services/user";
import { BackHandler, Image } from "react-native";
import Arena from "../../../assets/icons/arena.png";
import Home from "../../../assets/icons/home.png";
import UserImg from "../../../assets/icons/no-pic.png";
import Notification from "../../../assets/icons/notification.png";
import OnArena from "../../../assets/icons/onArena.png";
import OnHome from "../../../assets/icons/onHome.png";
import OnNotification from "../../../assets/icons/onNotification.png";
import OnWallet from "../../../assets/icons/onWallet.png";
import Wallet from "../../../assets/icons/wallet.png";
import SplashScreen from "../splashScreen";

interface IMainAppTabLayout {
  children: ReactNode;
}

let isLoading = true;
export default function MainAppTabLayout({ children }: IMainAppTabLayout) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const onBackPress = () => {
      Router.back();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    User.Load(() => {
      if (SessionUser) {
        if (!SessionUser.isVerified) {
          Logger.info("User not verified, routing to email verification page");
          AuthSession.sendVerifyCode();
          Router.push("/(tabs)/auth/accountVerification");
        } else {
          isLoading = false;
          Router.push("/(tabs)/mainApp")
        }
      }
    });

    return () => subscription.remove();
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 65,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? OnHome : Home}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="arena"
        options={{
          title: "Arena",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? OnArena : Arena}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? OnNotification : Notification}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? OnWallet : Wallet}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={UserImg}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
