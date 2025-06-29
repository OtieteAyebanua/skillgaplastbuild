import { SessionUser } from "@/services/user";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const socials = [
  {
    id: "1",
    icon: require("../../../assets/icons/youtube-icon.png"),
    url: "https://www.youtube.com",
  },
  {
    id: "2",
    icon: require("../../../assets/icons/twitter-icon.png"),
    url: "https://www.twitter.com",
  },
  {
    id: "3",
    icon: require("../../../assets/icons/facebook-icon.png"),
    url: "https://www.facebook.com",
  },
  {
    id: "4",
    icon: require("../../../assets/icons/tiktok-icon.png"),
    url: "https://www.tiktok.com",
  },
];

const UserDetails = () => {
  const theme = SessionUser?.preferences.darkMode;
  return (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: theme == false ? "#FFFFFF" : "#1D1F20",
        borderColor: theme == false ? "#E7F4FD" : "#27292B",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 4,
          position: "relative",
        }}
      >
        <CountryPicker withFlag countryCode="NG" />

        <View
          style={{
            position: "absolute",
            width: 50,
            height: 30,
            zIndex: 100,
          }}
        />
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontWeight: "600",
            textAlign: "center",
            textTransform: "capitalize",
            color: theme == false ? "#000" : "#fff",
          }}
        >
          {SessionUser?.fullName}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
            color: theme == false ? "#000" : "#fff",
          }}
        >
          @{SessionUser?.tag}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 12,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: theme == false ? "#020B12" : "#fff",
            }}
          >
            No. of dispute
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: theme == false ? "#000" : "#fff",
            }}
          >
            {SessionUser?.stats.disputes}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: theme == false ? "#020B12" : "#fff",
            }}
          >
            No. of Contest
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: theme == false ? "#000" : "#fff",
            }}
          >
            {SessionUser?.stats.disputes}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: theme == false ? "#020B12" : "#fff",
            }}
          >
            No. of Wins
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: theme == false ? "#000" : "#fff",
            }}
          >
            {SessionUser?.stats.wins}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "500",
              color: theme == false ? "#020B12" : "#fff",
            }}
          >
            No of losses
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: theme == false ? "#000" : "#fff",
            }}
          >
            {SessionUser?.stats.losses}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRadius: 10,
          padding: 16,
          borderWidth: 1,
          borderColor: theme == false ? "#E7F4FD" : "#313335",
          backgroundColor: theme == false ? "#FAFAFA" : "#27292B",
        }}
      >
        <Text
          style={{
            marginBottom: 8,
            fontWeight: "500",
            textAlign: "center",
            color: theme == false ? "#000" : "#fff",
          }}
        >
          Bio
        </Text>
        <Text
          style={{
            color: "#8F8F8F",
            fontSize: 12,
            textAlign: "center",
            lineHeight: 15,
          }}
        >
          {SessionUser?.bio ?? "- - - "}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 12,
        }}
      >
        {socials.map((item, index) => (
          <TouchableOpacity key={index}>
            <Image
              source={item.icon}
              style={{ width: 15, height: 15, marginHorizontal: 3 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default UserDetails;
