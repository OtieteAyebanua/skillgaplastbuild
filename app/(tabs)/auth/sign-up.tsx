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
  useColorScheme,
  View,
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
import type { Country } from "react-native-country-picker-modal";
// import useApi from "@/hooks/useApi";
// import { login, signup } from "@/services/api/userApi";
// import { IUserDetail } from "@/types/auth";
// import useToast from "@/components/toast";

import { IUserDetail } from "@/types/auth";
import { router } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";

const SignUp = () => {
  const theme = useColorScheme();
  const [country, setCountry] = useState<any>("NG");
  const [countryDetail, setCountryDetail] = useState<Country | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allValid, setAllValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState<String[] | number>(234);
  const [inValidEmailText, setShowInValidEmailText] = useState(false);
  const [signupPayload, setSignupPayload] = useState<IUserDetail>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    password: "",
    darkMode: true,
  });
  // const api = useApi(true);
  // const notify = useToast();

  const darkMode = theme === "dark" ? true : false;

  useEffect(() => {
    setSignupPayload((prev: any) => ({
      ...prev,
      firstName,
      lastName,
      email,
      country,
      password,
      darkMode,
    }));

    if (
      emailValidation(email) &&
      passwordValidation(password) &&
      firstName != "" &&
      lastName != "" &&
      passwordExactness(password, confirmPassword)
    ) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }

    console.log(country);
  }, [
    password,
    email,
    firstName,
    lastName,
    confirmPassword,
    countryDetail,
    countryCode,
  ]);

  // const onSignup = () => {
  //   if (!isLoading && allValid) {
  //     setIsLoading(true);
  //     api &&
  //       signup(api, signupPayload)
  //         .then((res) => {
  //           if (res) {
  //             login(api, email, password)
  //               .then((res) => {
  //                 if (res) {
  //                   setTokenToStorage(res);
  //                   setIsLoading(false);
  //                   router.push("/");
  //                 } else {
  //                   router.push("/login");
  //                 }
  //               })
  //               .catch(() => {
  //                 router.push("/login");
  //               });
  //           } else {
  //             console.log(res);
  //             notify("Try again");
  //             setShowInValidEmailText(true);
  //             setIsLoading(false);
  //           }
  //         })
  //         .catch((err) => {
  //           notify("Something went wrong");
  //           setShowInValidEmailText(true);
  //           setIsLoading(false);
  //         });
  //   }
  // };

  return (
    <View
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#000",
        flex: 1,
        height: hp("100%"),
        width: wp("100%"),
        paddingTop: 40,
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
          marginBottom: 24,
          paddingLeft: 12,
          fontSize: 24,
          fontWeight: "600",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        Create Account
      </Text>{" "}
      <KeyboardAvoidingView
        style={{ height: hp("80%"), width: wp("100%"), flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={{padding:4}}>
          <View style={{ width: wp("93%"), margin: "auto" }}>
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder="Enter first name"
              value={(e) => setFirstName(e)}
            />
          </View>

          <View style={{ width: wp("93%"), margin: "auto" }}>
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder="Enter last name"
              value={(e) => setLastName(e)}
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
            <Label>Region(Country)</Label>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setVisible(true)}
            >
              <ChevronDownIcon size={17} color={"#000000"} />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: hp("4.8%"),
              }}
            >
              <CountryPicker
                visible={visible}
                withFilter
                withFlag
                withAlphaFilter
                withCallingCode
                onSelect={(country) => {
                  setCountryDetail(country);
                  setCountry(country.cca2);
                  setVisible(false);
                  setCountryCode(countryDetail?.callingCode ?? 234);
                }}
                onClose={() => setVisible(false)}
                countryCode={country}
              />
              <Text
                style={{
                  color: "#8F8F8F",
                  fontSize: 14,
                }}
              >
                {countryDetail?.name ?? "Nigeria"}
              </Text>
            </View>
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
          onPress={() => {}}
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
