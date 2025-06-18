import { Tabs } from "expo-router";
import React, { ReactNode, useEffect } from "react";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Router } from "@/services/router";
import { BackHandler, Image } from "react-native";
import Arena from '../../../assets/icons/arena.png';
import Home from '../../../assets/icons/home.png';
import UserImg from '../../../assets/icons/no-pic.png';
import Notification from '../../../assets/icons/notification.png';
import OnArena from '../../../assets/icons/onArena.png';
import OnHome from '../../../assets/icons/onHome.png';
import OnNotification from '../../../assets/icons/onNotification.png';
import OnWallet from '../../../assets/icons/onWallet.png';
import Wallet from '../../../assets/icons/wallet.png';


interface IMainAppTabLayout {
  children: ReactNode;
}



export default function MainAppTabLayout({ children }: IMainAppTabLayout) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const onBackPress = () => {
      Router.back();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  }, []);
  console.log(typeof Home)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 65,
          paddingTop: 5
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
          tabBarIcon: ({ color,focused }) => (
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
          tabBarIcon: ({ color,focused }) => (
             <Image
              source={focused ? OnNotification: Notification}
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
          tabBarIcon: ({ color,focused }) => (
             <Image
              source={focused ? OnWallet: Wallet}
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
          tabBarIcon: ({ color,focused }) => (
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
