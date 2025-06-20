import { Router } from "@/services/router";
import { User } from "@/services/user";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function HomePage() {
  useEffect(() => {
    Router.clearHistory();

    User.Load();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#007BDB",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../../assets/images/splash-icon.png")}
        style={{
          width: 80,
          height: 40,
          marginBottom: 12,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          color: "#ffffff",
          fontSize: 14,
          textAlign: "center",
          opacity: 0.9,
        }}
      >
        🛠️ Home Dashboard coming soon! {"\n"} Track your activity at a
        glance—testing starts soon!
      </Text>
    </View>
  );
}
