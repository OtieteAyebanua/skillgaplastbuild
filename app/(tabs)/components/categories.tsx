import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";

const categories = [
  {
    title: "Sports",
    description:
      "Think about soccer, volley ball, basket ball, table tennis, Long tennis, Arm wrestling...",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Games",
    description:
      "Think about iMessage games, Android mobile games, Console game......",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Casual Activities",
    description:
      "Think about Tug of war, eating, staring, dancing, rapping, push up contest......",
    image: require("../../../assets/images/image2.png"),
  },
  {
    title: "Caal Activities",
    description:
      "Think about Tug of war, eating, staring, dancing, rapping, push up contest......",
    image: require("../../../assets/images/image2.png"),
  },
];

interface ICategories {
  close: () => void;
  openSub: () => void;
}
const Categories = ({ close, openSub }: ICategories) => {
  const theme = useColorScheme();
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: theme === "light" ? "#ffffff" : "#141414",
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
            width: "60%",
            justifyContent: "space-between",
          }}
        >
          <View className="">
            <TouchableOpacity
              onPress={() => close()}
              className={` w-[0px] rounded-full`}
              style={{
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
            style={{ fontSize: 16, fontWeight: 600 }}
            className={`  ${
              theme === "light" ? "#000000" : "#ffffff"
            }`}
          >
            Categories
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              close();
              openSub();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 12,
              padding: 12,
              marginBottom: 5,
            }}
          >
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                width: 100,
                height: 65,
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
              <Text
                style={{
                  width: 185,
                  height: 30,
                  fontSize: 10,
                  color: "#8F8F8F",
                }}
              >
                {item.description}
              </Text>
            </View>

            <View
              style={{
                width: 31,
                height: 63,
                backgroundColor: "#7900FB",
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRightIcon color={"#ffffff"} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
