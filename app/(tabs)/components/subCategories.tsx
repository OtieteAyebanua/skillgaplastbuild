import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const categories = [
  {
    title: "Sports",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Games",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    image: require("../../../assets/images/image2.png"),
  },
];

interface ICategories {
  close: () => void;
}
const SubCategories = ({ close }: ICategories) => {
  const theme = useColorScheme();
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: theme === "light" ? "#ffffff" : "#141414",
        height: "auto",
        maxHeight: "90%",
      }}
    >
      <View
        style={{
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: "center",
          backgroundColor: theme === "light" ? "#F8F8F8" : "#1D1F20",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "65%",
            justifyContent: "space-between",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => close()}
              style={{
                width: 0, // w-[0px]
                borderRadius: 9999, // rounded-full
                paddingLeft: 10,
              }}
            >
              <ChevronLeftIcon
                size={25}
                color={theme === "light" ? "#292D32" : "#ffffff"}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme === "light" ? "#020B12" : "#ffffff",
            }}
          >
            Sub Categories
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12,paddingBottom:50 }} 
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              borderRadius: 12, 
              marginBottom: 12, 
            }}
          >
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                width: 90,
                height: 60,
                borderRadius: 8, // rounded-md
                marginRight: 12,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16, // text-base
                  fontWeight: "600", // font-semibold
                  color: theme === "light" ? "#000000" : "#ffffff",
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default SubCategories;
