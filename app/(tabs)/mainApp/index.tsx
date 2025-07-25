import PageContainer from "@/components/Containers";
import { useUserContext } from "@/hooks/useAppContext";
import { useTheme } from "@/hooks/useThemeContext";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { SessionUser, User } from "@/services/user";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import FloatingWallet from "../components/floatingWallet";
import NetworkImage from "../components/networkImage";
import ShowContest from "../components/showContest";
import TrendingCategory from "../components/trendingCategories";
import SplashScreen from "../splashScreen";

export default function HomePage() {
  const [refreshToken, setRefreshToken] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setUser, user } = useUserContext();
  const [refreshing, setRefreshing] = useState(false);

  const [greeting, setGreeting] = useState(false);

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
    <PageContainer backgroundColor={theme == false ? "#FAFAFA" : "#0A0A0A"}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            width: "100%",
            padding: 16, // p-4 → 4 * 4
            flexDirection: "column",
            backgroundColor: theme == false ? "#FAFAFA" : "#131315",
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
      </ScrollView>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            Router.push("/(tabs)/components/contest/createContest")
          }
        >
          <PlusIcon size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#1D9BF0",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export const Nodata = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 1,
          color: theme ? "#fff" : "#000",
        }}
      >
        Ouch!
      </Text>

      <Text style={{ fontSize: 14, color: "#8F8F8F", textAlign: "center",fontWeight:500 }}>
        You don’t have an active contest now
      </Text>

      <View style={{ flexDirection: "row", marginTop: 4 }}>
        <TouchableOpacity onPress={() => Router.push("(tabs)/components/contest/createContest")}>
          <Text style={{ color: "#1D9BF0", fontSize: 14 }}>Create</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 14, color: "#777",fontWeight:500 }}> or </Text>

        <TouchableOpacity onPress={() => Router.push("/mainApp/arena")}>
          <Text style={{ color: "#1D9BF0", fontSize: 14,fontWeight:500 }}>Join contest</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 14, color: "#777",fontWeight:500 }}> now</Text>
      </View>
    </View>
  );
};
