import PageContainer from "@/components/Containers";
import { Router } from "@/services/router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import successImg from "../../../../assets/images/success-img.png";

const RecoverAccountPhase4 = () => {
  useEffect(() => {
    Router.clearHistory();
  }, []);

  return (
    <PageContainer style={{ paddingTop: 40 }} backgroundColor={"#ffffff"}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={successImg}
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
            color: "#020B12",
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
            Router.clearHistory();
            Router.push("/(tabs)/auth/auth-home");
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
  );
};

export default RecoverAccountPhase4;
