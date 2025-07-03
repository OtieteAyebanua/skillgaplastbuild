import { Router } from "@/services/router";
import { SessionUser } from "@/services/user";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SuccessfullyCreatedContest = () => {
  const theme = SessionUser?.preferences.darkMode;
  return (
     <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24, // px-6 = 6 * 4
      backgroundColor: theme === false ? "#ffffff" : "#000000",
    }}
  >
    <View
      style={{
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: 12, // rounded-xl
        paddingHorizontal: 24, // px-6
        paddingVertical: 40, // py-10 = 10 * 4
        width: "100%",
        maxWidth: 384, // max-w-md = 384px
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6, // Android shadow
        backgroundColor: theme === false ? "#ffffff" : "#000000", // to avoid transparent view
      }}
    >
      <View>
        <Image source={require("../../../../assets/images/doubleAvatar.png")} />
      </View>

      <Text
        style={{
          color: "#ffffff",
          fontSize: 20, // text-xl
          fontWeight: "bold",
          marginBottom: 8, // mb-2
        }}
      >
        It’s about to get real
      </Text>

      <Text
        style={{
          color: "#9ca3af", // text-gray-400
          fontSize: 14, // text-sm
          textAlign: "center",
          marginBottom: 24, // mb-6
        }}
      >
        Your contest request has been sent to successfully. You will be
        notified once he gives a response
      </Text>

      <TouchableOpacity
        onPress={() => {
          Router.push('/(tabs)/components/contest/myContestDetails')
        }}
        style={{
          width: "40%",
          height: hp("5%"),
          borderRadius: 100,
          padding: 10,
          backgroundColor: "#1D9BF0",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 14,
          }}
        >
          My contest
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default SuccessfullyCreatedContest;
