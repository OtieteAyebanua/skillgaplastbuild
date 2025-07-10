import PageContainer from "@/components/Containers";
import { Logger } from "@/services/logger";
import { Transaction } from "@/services/transaction";
import { SessionUser } from "@/services/user";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { WebView } from "react-native-webview";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";

const CallBackUrl = "http://skillgap.co/paystack";
const CreateDeposit = () => {
  const theme = SessionUser?.preferences.darkMode;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const initiateDeposit = async () => {
    if (amount < 100 || isLoading) return;

    setIsLoading(true);
    const result = await Transaction.initiateDeposit(amount, CallBackUrl);
    if (result) {
      setCheckoutUrl(result.url);
    }

    setIsLoading(false);
  };

  const onShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => {
    const { url } = request;

    Logger.info(url);
    // we got our callback
    if (url.includes(CallBackUrl)) {
      setAmount(0);
      setCheckoutUrl(null);

      alert("Payment Completed");
      return true;
    }

   return false;
  };

  if (checkoutUrl) {
    return (
      <WebView
        source={{ uri: checkoutUrl }}
        style={{ marginTop: 40 }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // adjust as needed
    >
      <PageContainer backgroundColor={theme == false ? "" : "#141414"}>
        <ScrollView
          style={{
            marginBottom: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10%", // originally 'mb-3' but overridden
            }}
          >
            <Text
              style={{
                fontSize: 16, // 'text-base' → 16px
                fontWeight: "600", // 'font-semibold'
                color: theme === false ? "#020B12" : "#ffffff",
                paddingTop: 30,
              }}
            >
              Deposit
            </Text>
          </View>

          <View
            style={{
              backgroundColor: theme == false ? "#ffffff" : "#1D1F20",
              borderColor: theme == false ? "#E7F4FD" : "#27292B",
              borderWidth: 1,
              borderRadius: 8,
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                width: "96%",
                height: 21,
                fontFamily: "General Sans Variable",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 14,
                lineHeight: 21,
                letterSpacing: -0.01,
                flexGrow: 0,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 10,
                color: theme == false ? "#000" : "#fff",
              }}
            >
              Amount
            </Text>

            <TextInput
              placeholder="e.g #10,000"
              placeholderTextColor={"#8F8F8F"}
              inputMode="numeric"
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#242628",
                width: "99%",
                height: 40,
                marginLeft: "auto",
                marginRight: "auto",
                color: theme === false ? "#000000" : "#ffffff",
                marginTop: 10,
                padding: 5,
                paddingLeft: 10,
                fontSize: 14,
              }}
              value={`${amount}`}
              onChangeText={(val) => setAmount(Number(val))}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                columnGap: 3,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  height: 17,
                  fontFamily: "General Sans Variable",
                  fontStyle: "italic",
                  fontWeight: "400",
                  fontSize: 11,
                  lineHeight: 16.5,
                  letterSpacing: -0.121,
                  color: "#8F8F8F",
                }}
              >
                Min:
              </Text>
              <Text
                style={{
                  height: 17,
                  fontFamily: "General Sans Variable",
                  fontStyle: "italic",
                  fontWeight: "400",
                  fontSize: 11,
                  lineHeight: 16.5,
                  color: theme == false ? "#000" : "#fff",
                }}
              >
                #100
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={initiateDeposit}
            style={{
              width: wp("90%"),
              height: hp("7%"),
              borderRadius: 100,
              padding: 10,
              backgroundColor: amount >= 100 ? "#1D9BF0" : "#8F8F8F",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: "auto",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={30} color={"#ffffff"} />
              ) : (
                "Pay"
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </PageContainer>
    </KeyboardAvoidingView>
  );
};
export default CreateDeposit;
