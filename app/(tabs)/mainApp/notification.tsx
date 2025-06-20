import { Router } from "@/services/router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

const Notification = () => {
  useEffect(() => {
    Router.clearHistory();
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
        🔔 Notifications on the way… {"\n"}
        Stay alert! All your updates will be live here soon.
      </Text>
    </View>
  );
};

export default Notification;
