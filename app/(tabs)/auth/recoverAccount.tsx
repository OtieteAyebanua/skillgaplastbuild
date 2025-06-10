import Input from "@/components/ui/Input";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import darkSuccessImg from "../../../assets/images/dark-success-img.png";
import successImg from "../../../assets/images/success-img.png";
import {
  emailValidation,
  passwordExactness,
  passwordValidation,
} from "../../../services/formValidation";
// import {
//   getPasswordResetCode,
//   savePassword,
//   sendPasswordResetCode,
// } from "@/services/api/userApi";
// import useApi from "@/hooks/useApi";
// import useToast from "@/components/toast";
import Label from "@/components/ui/Label";

import PageContainer from "@/components/Containers";
import { router } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const RecoverAccount = () => {
  const theme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstPhase, setFirstPhase] = useState(true);
  const [swapToCongratulations, setSwapToCongratulations] = useState(false);
  const [swapToOtp, setSwapToOtp] = useState(false);
  const [proceedLoader, setProceedLoader] = useState(false);
  const [passwordLoader, setPasswordLoader] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [startTimer, setStartTimer] = useState(false);
  // const api = useApi(true);
  // const notify = useToast();
  const INITIAL_TIME = 90;

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_TIME);
  const [showResend, setShowResend] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (!startTimer) return; // Timer only starts when `startTimer` is true

    if (secondsRemaining <= 0) {
      setShowResend(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, startTimer]);

  // const handleResend = () => {
  //   getOtp();
  //   setSecondsRemaining(INITIAL_TIME);
  //   setShowResend(false);
  // };

  // const getOtp = () => {
  //   if (!proceedLoader) {
  //     setProceedLoader(true);
  //     api &&
  //       getPasswordResetCode(api, email)
  //         .then((res) => {
  //           setProceedLoader(false);

  //           if (res.data === true) {
  //             setStartTimer(true);
  //             setSecondsRemaining(90);
  //             setSwapToOtp(true);
  //           } else {
  //             notify("Email doesn't exist");
  //           }
  //         })
  //         .catch(() => {
  //           setProceedLoader(false);
  //           notify("Something went wrong");
  //         });
  //   }
  // };
  // const sendOtp = () => {
  //   if (!otpLoader) {
  //     setOtpLoader(true);
  //     api &&
  //       sendPasswordResetCode(api, email, otp)
  //         .then((res) => {
  //           if (res) {
  //             setOtpLoader(false);
  //             setFirstPhase(false);
  //           } else {
  //             notify("Try that again...");
  //             setOtpLoader(false);
  //           }
  //         })
  //         .catch(() => {
  //           notify("Something went wrong...");
  //           setOtpLoader(false);
  //         });
  //   }
  // };

  // const onSavePassword = () => {
  //   if (!passwordLoader) {
  //     api &&
  //       savePassword(api, email, otp, password)
  //         .then((res) => {
  //           if (res) {
  //             setPasswordLoader(false);
  //             setSwapToCongratulations(true);
  //           } else {
  //             notify("Try again");
  //             setPasswordLoader(false);
  //           }
  //         })
  //         .catch(() => {
  //           notify("Something went wrong");
  //           setPasswordLoader(false);
  //         });
  //   }
  // };

  const resendStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    etaText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "gray",
      marginRight: 10,
    },
    timerText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "light" ? "#000000" : "#FFFFFF",
    },
    resendContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      fontSize: 16,
      color: "gray",
    },
    resendText: {
      fontSize: 16,
      color: "#1D9BF0",
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
  });

  return firstPhase ? (
    swapToOtp ? (
      <SafeAreaView
        style={{
          paddingTop: 40,
          flex: 1,
          backgroundColor: theme === "light" ? "#fff" : "#141414",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 16, // px-4
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
              fontSize: 24, // text-2xl
              marginBottom: 12, // mb-3 = 3 * 4
              fontWeight: "600", // font-semibold
              color: theme === "light" ? "#020B12" : "#ffffff",
            }}
          >
            Recover Account
          </Text>

          <Text
            style={{
              color: theme === "light" ? "#000000" : "#ffffff",
              fontSize: 14, // text-sm
            }}
          >
            Enter OTP sent to your Email {email.toLowerCase()}
          </Text>

          <View
            style={{
              width: wp("90%"),
              alignSelf: "center",
              marginTop: 16, // mt-4 = 4 * 4
            }}
          >
            <OTPTextInput
              handleTextChange={setOtp}
              containerStyle={{
                justifyContent: "space-evenly",
                marginBottom: hp("2%"),
                width: wp("90%"),
                alignSelf: "center",
              }}
              textInputStyle={{
                width: wp("12%"),
                height: hp("6.5%"),
                fontSize: wp("4%"),
                borderRadius: wp("2%"),
                textAlign: "center",
                borderWidth: 2,
                borderColor: "#FAFAFA",
                color: theme === "light" ? "#344054" : "#8F8F8F",
              }}
              inputCount={6}
              tintColor="#338AF3"
            />
          </View>

          <View style={resendStyles.container}>
            {!showResend ? (
              <>
                <Text style={resendStyles.etaText}>ETA</Text>
                <Text style={resendStyles.timerText}>
                  {formatTime(secondsRemaining)}
                </Text>
              </>
            ) : (
              <View style={resendStyles.resendContainer}>
                <Text style={resendStyles.errorText}>
                  Didn't get the email?
                </Text>
                <TouchableOpacity
                // onPress={handleResend}
                >
                  <Text style={resendStyles.resendText}>Resend</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity
           // onPress={sendOtp}
            style={{
              width: "99%",
              height: 56,
              borderRadius: 100,
              padding: 10,
              backgroundColor: "#1D9BF0",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 24,
            }}
          >
            {otpLoader ? (
              <ActivityIndicator size={30} color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                }}
              >
                Verify OTP
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    ) : (
      //.............Enter Email........................................
      <>
        <SafeAreaView
          style={{
            paddingTop: 40,
            flex: 1,
            backgroundColor: theme === "light" ? "#fff" : "#141414",
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 16, // px-4
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

            <View>
              <Text
                style={{
                  fontSize: 24, // text-2xl
                  fontWeight: "600", // font-semibold
                  color: theme === "light" ? "#020B12" : "#ffffff",
                }}
              >
                Recovery Account
              </Text>

              <Text
                style={{
                  color: theme === "light" ? "#000000" : "#ffffff",
                  marginTop: 30,
                  marginBottom: 50,
                }}
              >
                Enter email address associated with your existing account to
                receive a verification code
              </Text>

              <Input
                type="email"
                placeholder="Enter Email"
                value={(e) => setEmail(e)}
              />

              <TouchableOpacity
                onPress={()=>{}}
                disabled={!emailValidation(email)}
                style={{
                  width: "99%",
                  height: 56,
                  borderRadius: 100,
                  padding: 10,
                  backgroundColor: emailValidation(email)
                    ? "#1D9BF0"
                    : "#8F8F8F",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 40,
                  alignSelf: "center", // replaces margin: "auto"
                }}
              >
                {proceedLoader ? (
                  <ActivityIndicator size={30} color="#ffffff" />
                ) : (
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                    }}
                  >
                    Proceed
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  ) : //....................Congratulations...............................
  swapToCongratulations ? (
    <PageContainer
      style={{ paddingTop: 40 }}
      backgroundColor={theme === "light" ? "#ffffff" : "#000000"}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={theme === "light" ? successImg : darkSuccessImg}
          style={{
            width: 100,
            height: 100,
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            marginBottom: 4,
            color: theme === "light" ? "#020B12" : "#ffffff",
          }}
        >
          Congratulations
        </Text>

        <Text
          style={{
            color: "#344054",
            fontWeight: "500",
            marginBottom: 40,
          }}
        >
          Your password reset was successful
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.push("/(tabs)/auth/login"); // removed group folder
          }}
        >
          <Text
            style={{
              color: "#1D9BF0",
              fontWeight: "500",
            }}
          >
            Proceed to login
          </Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  ) : (
    //..............save password.....................................
    <SafeAreaView
      style={{
        paddingTop: 40,
        flex: 1,
        backgroundColor: theme === "light" ? "#fff" : "#141414",
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
            fontSize: 24,
            marginBottom: 40,
            fontWeight: "600",
            color: theme === "light" ? "#020B12" : "#ffffff",
          }}
        >
          Reset Password
        </Text>

        {/* Password Field */}
        <View style={{ width: "100%", marginBottom: 16 }}>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={(e) => setPassword(e)}
          />
          {!passwordValidation(password) && password !== "" && (
            <Text style={{ color: "#F04438" }}>
              Password must be 8–12 characters long and include at least one
              uppercase letter, one lowercase letter, and one number
            </Text>
          )}
        </View>

        {/* Confirm Password Field */}
        <View style={{ width: "100%", marginBottom: 80 }}>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm password"
            value={(e) => setConfirmPassword(e)}
          />
          {!passwordExactness(password, confirmPassword) && (
            <Text style={{ color: "#F04438" }}>Password does not match</Text>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          //onPress={onSavePassword}
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
            marginTop: -20,
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
export default RecoverAccount;
