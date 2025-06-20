import Input from "@/components/ui/Input";
import { AuthSession } from "@/services/authSession";
import {
  passwordExactness,
  passwordValidation,
} from "@/services/formValidation";
import { Logger } from "@/services/logger";
import { Router } from "@/services/router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const RecoverAccountPhase3 = () => {
  const [passwordLoader, setPasswordLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const simulateApiReq = async () => {
    setPasswordLoader(true);
    const success = await AuthSession.resetPassword(password);
    if (success) {
      Router.push("/(tabs)/auth/recoverPassword/recoverAccountPhase4");
    } else {
      // TODO :: replace it with toast message to user
      Logger.error("Something went wrong, please try that again.");
    }

    setPasswordLoader(false);
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 40,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Router.back();
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
            fontSize: 24,
            marginBottom: 40,
            fontWeight: "600",
            color: "#020B12",
          }}
        >
          Reset Password
        </Text>

        {/* Password Field */}
        <View style={{ width: "100%", marginBottom: 16 }}>
          <Text style={{ color: "#344054" }}>Password</Text>
          <Input
            type="password"
            placeholder="Enter new password"
            value={(e) => setPassword(e)}
          />
          <View
            style={{
              display:
                !passwordValidation(password) && password !== ""
                  ? "flex"
                  : "none",
            }}
          >
            {!passwordValidation(password) && password !== "" ? (
              <Text style={{ color: "#F04438" }}>
                Password must be 8–12 characters long.
              </Text>
            ) : null}
          </View>
        </View>

        {/* Confirm Password Field */}
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text style={{ color: "#344054" }}>Confirm Password</Text>
          <Input
            type="password"
            placeholder="Confirm password"
            value={(e) => setConfirmPassword(e)}
          />
          <View
            style={{
              display: !passwordExactness(password, confirmPassword)
                ? "flex"
                : "none",
            }}
          >
            {!passwordExactness(password, confirmPassword) ? (
              <Text style={{ color: "#F04438" }}>Password does not match</Text>
            ) : null}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={() => {
            simulateApiReq();
          }}
          disabled={
            !(
              passwordValidation(password) &&
              passwordExactness(password, confirmPassword)
            )
          }
          style={{
            width: "99%",
            height: 56,
            borderRadius: 100,
            padding: 10,
            backgroundColor:
              passwordValidation(password) &&
              passwordExactness(password, confirmPassword)
                ? "#1D9BF0"
                : "#8F8F8F",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 0,
            alignSelf: "center",
          }}
        >
          {passwordLoader ? (
            <ActivityIndicator size={30} color="#ffffff" />
          ) : (
            <Text style={{ color: "#ffffff", fontSize: 14 }}>
              Save Password
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoverAccountPhase3;
