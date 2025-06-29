import { SessionUser } from "@/services/user";
import { Image, ScrollView, Text, View } from "react-native";

const trendingCategories = [
  {
    index: 1,
    image: require("../../../assets/images/profile-bg.png"),
    name: "Sports",
    bets: 500,
    users: 200,
  },
  {
    index: 1,
    image: require("../../../assets/images/profile-bg.png"),
    name: "Sports",
    bets: 500,
    users: 200,
  },
  {
    index: 1,
    image: require("../../../assets/images/profile-bg.png"),
    name: "Sports",
    bets: 500,
    users: 200,
  },
  {
    index: 1,
    image: require("../../../assets/images/profile-bg.png"),
    name: "Sports",
    bets: 500,
    users: 200,
  },
];

const TrendingCategory = () => {
    const theme = SessionUser?.preferences.darkMode;
  return (
    <View
      style={{
        paddingTop: 16, // pt-4
        marginBottom: 12, // mb-3
        backgroundColor: "transparent",
      }}
    >
      <Text
        style={{
          fontWeight: "500", // font-medium
          fontSize: 18, // text-lg
          color: theme == false ? "#020B12" : "#ffffff",
        }}
      >
        Leader Board
      </Text>

      <View style={{ flexDirection: "row" }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", paddingBottom: 5 }}>
            {trendingCategories.map((item) => {
              return (
                <View
                  key={item.name}
                  style={{
                    padding: 4, // p-1
                    paddingLeft: 8, // pl-2
                    paddingRight: 8, // pr-2
                    paddingTop: 10, // pt-2
                    backgroundColor: theme == false ? "#FAFAFA" : "#27292B",
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 130,
                      height: 80,
                      borderRadius: 2,
                    }}
                    source={item.image}
                  />
                  <Text
                    style={{
                      color: theme == false ? "#020B12" : "#ffffff",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: theme == false ? "#000000" : "#8F8F8F",
                        fontSize: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: theme == false ? "#000000" : "#ffffff",
                          fontSize: 12,
                        }}
                      >
                        Bets :
                      </Text>{" "}
                      {item.bets}
                    </Text>
                    <Text
                      style={{
                        color: theme == false ? "#000000" : "#8F8F8F",
                        fontSize: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: theme == false ? "#000000" : "#ffffff",
                          fontSize: 12,
                        }}
                      >
                        Users :
                      </Text>{" "}
                      {item.users}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TrendingCategory;
