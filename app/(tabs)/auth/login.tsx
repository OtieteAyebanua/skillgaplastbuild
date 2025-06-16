import { emailValidation } from "@/services/formValidation";
import { Router } from "@/services/router";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Input, { PasswordTextBox } from "../../../components/ui/Input";
import Label from "../../../components/ui/Label";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [fontsLoaded] = useFonts({
    "GeneralSans-Variable": require("../../../assets/fonts/GeneralSans-Medium.ttf"),
  });

  const routeTo = (url: any) => {
    Router.push(url);
  };

  const simulateApiReq = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Router.push('/(tabs)/auth/transactionPin')
    }, 2000);
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        height: "100%",
        backgroundColor: "#fff",
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
            <ChevronLeftIcon size={25} color={"#292D32"} />
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
            onPress={() => {
              simulateApiReq();
            }}
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

          <TouchableOpacity
            style={{ alignItems: "center", paddingTop: 5 }}
            onPress={() => Router.push('/auth/recoverPassword/recoverAccountPhase1')}
          >
            <Text
              style={{
                alignItems: "center",
                color: "#1D9BF0",
                fontWeight: "600",
              }}
            >
              Recover Password
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center",paddingTop:1 }}>
            <Text
              style={{
                alignItems: "center",
                color: "#000",
              }}
            >
              Don’t have an account?
              <TouchableOpacity onPress={() => routeTo("/(tabs)/auth/sign-up")}>
                <Text
                  style={{
                    alignItems: "center",
                    color: "#1D9BF0",
                    fontWeight: "600",
                    paddingTop:15,
                    paddingLeft:3
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
