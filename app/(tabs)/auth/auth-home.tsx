import { useFonts } from "expo-font";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const AuthHome = () => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk: require("../../../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../../assets/images/auth-home-bg.png")}
        resizeMode="cover"
        className="flex-1 h-full"
      >
        <View
          style={{
            flex: 1, // flex-1
            alignItems: "center", // items-center
            justifyContent: "flex-end", // justify-end
          }}
        >
          <Image
            source={require("../../../assets/images/auth-home-min.png")}
            style={{
              width: wp("100%"),
              height: hp("60%"),
              resizeMode: "contain",
              transform: [{ translateY: 80 }], // translate-y-20 → 20 * 4 = 80
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF", 
            borderTopLeftRadius: 24, 
            borderTopRightRadius: 24,
            padding: 24, 
            height: "100%",
          }}
        >
          <View style={{ alignItems: "center", paddingTop: 32 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#141414", 
                marginBottom: 8, 
                fontFamily: "SpaceGrotesk",
              }}
            >
              Skillgap
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#8F8F8F",
                fontWeight: "500",
                lineHeight: 22,
                marginBottom: 24,
              }}
            >
              Win cash completing bets using your preferred skill
            </Text>

            <TouchableOpacity
              onPress={() => {router.push('/(tabs)/auth/sign-up')}}
              style={{
                width: wp("90%"),
                height: 56,
                borderRadius: 100,
                padding: 10,
                backgroundColor: "#1D9BF0",

                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: "auto",
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 14 }}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {router.push('/(tabs)/auth/login')}}
              style={{
                width: wp("90%"),
                height: 56,
                borderRadius: 100,
                padding: 10,
                backgroundColor: "transparent",
                borderColor: "#1D9BF0",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: "auto",
                borderWidth: 2,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#1D9BF0", fontSize: 14 }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default AuthHome;
