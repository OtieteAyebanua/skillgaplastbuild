import PageContainer from "@/components/Containers";
import { useUserContext } from "@/hooks/useAppContext";
import { useTheme } from "@/hooks/useThemeContext";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { SessionUser, User } from "@/services/user";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import FloatingWallet from "../components/floatingWallet";
import NetworkImage from "../components/networkImage";
import ShowContest from "../components/showContest";
import TrendingCategory from "../components/trendingCategories";
import SplashScreen from "../splashScreen";

export default function HomePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshToken, setRefreshToken] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, user } = useUserContext();
  const onRefresh = () => {
    User.Load();
    setRefreshToken(!refreshToken);
    setUser(SessionUser);
    setTheme(SessionUser?.preferences.darkMode ?? false);
  };

  useFocusEffect(
    useCallback(() => {
      Router.clearHistory();
      User.Load(() => {
        setUser(SessionUser);
        setTheme(SessionUser?.preferences.darkMode ?? false);
      });
    }, [])
  );

  return !user ? (
    <SplashScreen />
  ) : (
    <PageContainer backgroundColor={theme == false ? "#fff" : "#0A0A0A"}>
      
        <View
          style={{
            width: "100%",
            padding: 16, // p-4 → 4 * 4
            flexDirection: "column",
            backgroundColor: theme == false ? "#ffffff" : "#131315",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20, // mb-5 → 5 * 4
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderStyle: "solid",
                borderColor: "red",
                width: "auto",
                borderRadius: 100,
                marginRight: 10,
                position: "relative",
              }}
            >
              <View
                style={{
                  borderStyle: "solid",
                  borderColor: "#FFFFFF",
                  width: 10,
                  height: 10,
                  borderWidth: 1,
                  borderRadius: 100,
                  marginRight: 10,
                  position: "absolute",
                  top: 35,
                  left: 32,
                  backgroundColor: "#12B76A",
                  zIndex: 1,
                }}
              />
              <NetworkImage
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
                uri={Media.GetProfileImageUris(SessionUser?.id ?? 0)?.medium}
                loadingUri={require("../../../assets/images/profile-img.png")}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: "#8F8F8F",
                  marginRight: 4,
                }}
              >
                Howdy,
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  color: theme == false ? "#000000" : "#ffffff",
                  textTransform: "capitalize",
                }}
              >
                {user?.fullName}
              </Text>
            </View>
          </View>

          <FloatingWallet refreshing={refreshToken} />
          <TrendingCategory refreshing={refreshToken} />
          <ShowContest refreshing={refreshToken} />
        </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => Router.push("/(tabs)/components/contest/createContest")}
      >
        <Text style={styles.plus}>
          <PlusIcon size={30} color="#fff" />
        </Text>
      </TouchableOpacity>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 10,
    right: 30,
    backgroundColor: "#2196F3", // blue color
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  plus: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "bold",
  },
});
