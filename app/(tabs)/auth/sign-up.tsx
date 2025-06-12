import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import {
  emailValidation,
  passwordExactness,
  passwordValidation,
} from "@/services/formValidation";

import { Router } from "@/services/router";
import { IUserDetail } from "@/types/auth";
import {
  ChevronLeftIcon
} from "react-native-heroicons/outline";

const SignUp = () => {
  const [country, setCountry] = useState<any>("NG");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allValid, setAllValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inValidEmailText, setShowInValidEmailText] = useState(false);
  const [signupPayload, setSignupPayload] = useState<IUserDetail>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    password: "",
    darkMode: true,
  });

  useEffect(() => {
    setSignupPayload((prev: any) => ({
      ...prev,
      fullName,
      lastName,
      email,
      country,
      password,
    }));

    if (
      emailValidation(email) &&
      passwordValidation(password) &&
      fullName != "" &&
      passwordExactness(password, confirmPassword)
    ) {
      setAllValid(true);  
    } else {
      setAllValid(false);
    }
  }, [
    password,
    email,
    fullName,
    confirmPassword,
  ]);

  const simulateApiReq = ()=>{
    setIsLoading(true);
    setTimeout(()=>{setIsLoading(false);Router.push('/(tabs)/auth/accountVerification')},1000)
    return false;
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        height: hp("100%"),
        width: wp("100%"),
        paddingTop: 40,
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
        <ChevronLeftIcon
          size={25}
          color={"#292D32"}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginBottom: 24,
          paddingLeft: 12,
          fontSize: 24,
          fontWeight: "600",
          color: "#000",
        }}
      >
        Create Account
      </Text>{" "}
      <KeyboardAvoidingView
        style={{ height: hp("80%"), width: wp("100%"), flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={{ padding: 4 }}>
          <View style={{ width: wp("93%"), margin: "auto" }}>
            <Label>Full name</Label>
            <Input
              type="text"
              placeholder="Enter full name"
              value={(e) => setFullName(e)}
            />
          </View>

          <View style={{ width: wp("93%"), margin: "auto" }}>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={(e) => setEmail(e)}
            />
            <Text style={{ color: "#F04438", paddingLeft: 10 }}>
              {!inValidEmailText
                ? null
                : "Incorrect email or already been used"}
            </Text>
          </View>
          <View style={{ width: wp("93%"), margin: "auto" }}>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={(e) => setPassword(e)}
            />
            <Text style={{ color: "#F04438" }}>
              {!passwordValidation(password) && password != ""
                ? "Password must be 8-12 characters long and include at least one uppercase letter, one lowercase letter, and one number"
                : null}
            </Text>
          </View>

          <View style={{ width: wp("93%"), margin: "auto" }}>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={(e) => setConfirmPassword(e)}
            />
            <Text>
              {!passwordExactness(password, confirmPassword) ? (
                <Text style={{ color: "#F04438" }}>
                  "Password does not match"
                </Text>
              ) : null}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          width: wp("100%"),
          marginBottom: 20,
        }}
        className={`bg-white`}
      >
        <TouchableOpacity
          onPress={() => {simulateApiReq()}}
          disabled={allValid ? false : true}
          style={{
            width: wp("90%"),
            height: hp("7%"),
            borderRadius: 100,
            padding: 10,
            backgroundColor: allValid ? "#1D9BF0" : "#8F8F8F",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "auto",
          }}
        >
          <Text
            style={{ color: allValid ? "#ffffff" : "#ffffff", fontSize: 14 }}
          >
            {isLoading ? (
              <ActivityIndicator size={30} color={"#ffffff"} />
            ) : (
              "Sign up"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 3,
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    borderRadius: 100,
    justifyContent: "space-between",
    borderColor: "#8F8F8F",
    borderStyle: "solid",
    borderWidth: 1,
    width: wp("93%"),
    margin: "auto",
  },
  label: {
    fontSize: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: hp("4%"),
  },
  flag: {
    width: wp("0%"),
    height: 5,
    marginRight: 1,
  },
  text: {
    color: "red",
    fontSize: 14,
  },
});
