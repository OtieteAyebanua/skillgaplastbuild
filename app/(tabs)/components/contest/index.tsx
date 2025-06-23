import PageContainer from "@/components/Containers";
import { Router } from "@/services/router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const Contest = () => {
  const theme = useColorScheme();
  return (
    <PageContainer backgroundColor={theme === "light" ? "" : "#141414"}>
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
            marginBottom: 12,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 12, // left-3 → 3 * 4
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
          </View>

          <Text
            style={{
              fontSize: 16, // text-base
              fontWeight: "600", // font-semibold
              color: theme === "light" ? "#020B12" : "#ffffff",
            }}
          >
            Create Contest
          </Text>
        </View>
      </ScrollView>
    </PageContainer>
  );
};
export default Contest;
