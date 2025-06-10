import { useFonts } from "expo-font";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input, { PasswordTextBox } from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";
// import { login } from "@/services/api/userApi";
// import useToast from "@/components/toast";
// import useApi from "@/hooks/useApi";
// import { emailValidation } from "@/services/helpers/formValidation";
// import { setTokenToStorage } from "@/services/helpers/tokenStorage";
import { emailValidation } from "@/services/formValidation";
import { Link, router } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useColorScheme();
  // const api = useApi(true);
  // const notify = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [fontsLoaded] = useFonts({
    "GeneralSans-Variable": require("../../../assets/fonts/GeneralSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // const onLogin = async () => {
  //   if (!api || isLoading) return;

  //   setIsLoading(true);
  //   setError(false);

  //   try {
  //     const res = await login(api, email, password);

  //     if (res) {
  //       await setTokenToStorage(res);
  //       refreshUserData?.();
  //       router.push("/");
  //     } else {
  //       setError(true);
  //       notify("Login failed, please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setError(true);
  //     notify("Something went wrong, please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        height: "100%",
        backgroundColor: theme === "light" ? "#fff" : "#000", // bg-[#fff]
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%", // w-full
            paddingHorizontal: 16, // px-4
            paddingTop: 24, // pt-6
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/auth/auth-home");
            }}
            style={{
              paddingLeft: 3,
              marginBottom: 24, // mb-6 → 6 × 4
              width: 30, // w-[30px]
              borderRadius: 9999,
            }}
          >
            <ChevronLeftIcon
              size={25}
              color={theme === "light" ? "#292D32" : "#ffffff"}
            />
          </TouchableOpacity>

          <Text
            style={{
              marginBottom: 32, // mb-8 → 8 * 4
              fontSize: 24, // text-2xl
              fontWeight: "600", // font-semibold
              color: "#020B12",
            }}
          >
            Log In
          </Text>

          <View style={{ width: "100%", marginBottom: 16 }}>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={(e) => setEmail(e)}
              isError={error}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 80 }}>
            <Label>Password</Label>
            <PasswordTextBox value={(e) => setPassword(e)} />
          </View>

          <TouchableOpacity
            onPress={() => {}}
            disabled={!emailValidation(email)}
            style={{
              width: wp("90%"),
              height: hp("7%"),
              borderRadius: 100,
              padding: 10,
              backgroundColor: emailValidation(email) ? "#1D9BF0" : "#8F8F8F",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center", // marginHorizontal: 'auto' equivalent
            }}
          >
            {isLoading ? (
              <ActivityIndicator size={30} color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>

          <Link
            href="/(tabs)/auth/recoverAccount"
            style={{
              textAlign: "center",
              color: "#1D9BF0",
              fontWeight: "600", // font-semibold
              fontSize: 14, // text-sm ≈ 14px
              marginBottom: 8, // mb-2 → 2 * 4px
            }}
          >
            Recover Password
          </Link>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                alignItems: "center",
                color: theme === "light" ? "#000" : "#fff",
              }}
            >
              Don’t have an account?
              <Link
                href="/(tabs)/auth/sign-up"
                style={{
                  color: "#1D9BF0",
                  fontWeight: "600",
                }}
              >
                Create Account
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
