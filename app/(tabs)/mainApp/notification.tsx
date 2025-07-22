import PageContainer from "@/components/Containers";
import { useTheme } from "@/hooks/useThemeContext";
import { Router } from "@/services/router";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import darkSuccessImg from "../../../assets/images/dark-success-img.png";
import successImg from "../../../assets/images/success-img.png";
const data = [
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
    options: true,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
    options: true,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
    options: true,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
  {
    time: 2,
    type: "sport",
    description: "You just won the contest between",
    user: " @qubigs",
    amount: 20,
  },
];
const Notification = () => {
    const {theme} = useTheme();
  useEffect(() => {
    Router.clearHistory();
  }, []);

  return (
    <PageContainer backgroundColor={theme == false ? "" : "#141414"}>
      <ScrollView>
        <View
          style={{
            marginBottom: "10%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >


          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme == false ? "#020B12" : "#ffffff",
            }}
          >
            Notifications
          </Text>
        </View>

        {data.map((item) => (
          <View
            style={{
              width: wp("92%"),
              marginHorizontal: "auto",
              backgroundColor: theme == false ? "#ffffff" : "#1D1F20",
              borderRadius: 8,
              flexDirection: "column",
              padding: 10,
              gap: 10,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={theme == false ? successImg : darkSuccessImg}
                style={{ width: 35, height: 35 }}
              />
              <View>
                <View
                  style={{
                    width: "70%",
                    marginBottom: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      Congratulations
                    </Text>
                    <Text
                      style={{
                        color: "#9ca3af", // tailwind's gray-400
                        fontSize: 12,
                        marginHorizontal: 8,
                      }}
                    >
                      {item.time} mins ago
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 8,
                      fontWeight: "500",
                    }}
                  >
                    Sport
                  </Text>
                </View>
                <Text
                  style={{
                    width: "70%",
                    color: "#9ca3af",
                    fontSize: 12,
                  }}
                >
                  {item.description}
                  <Text
                    style={{
                      color: "#3b82f6",
                      fontWeight: "500",
                    }}
                  >
                    {item.user}
                  </Text>{" "}
                  with a winning prize of ${item.amount}
                </Text>
              </View>
            </View>

            {item.options ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "40%",
                    alignItems: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    borderRadius: 9999,
                    borderWidth: 2,
                    borderColor: "#1D9BF0",
                  }}
                >
                  <Text
                    style={{
                      color: "#1D9BF0",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "40%",
                    alignItems: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    borderRadius: 9999,
                    backgroundColor: "#3b82f6",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </PageContainer>
  );
};

export default Notification;
