import { Contest, ITrendingCategory } from "@/services/contest";
import { Media } from "@/services/media";
import { SessionUser } from "@/services/user";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import NetworkImage from "./networkImage";

const TrendingCategory = () => {
  const theme = SessionUser?.preferences.darkMode;

  const [categories, setCategories] = useState<ITrendingCategory[]>([]);

  useEffect(() => {
    Contest.getTrendingCategories().then((data) => {
      setCategories(data ?? []);
    });
  }, []);

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
        Trending Categories
      </Text>

      <View style={{ flexDirection: "row" }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", paddingBottom: 5 }}>
            {categories.map((item) => {
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
                  <NetworkImage
                    loadingUri={require("../../../assets/images/icon.png")}
                    uri={Media.GetCategoryImageUris(item.id)?.large}
                    style={{
                      width: 130,
                      height: 80,
                      borderRadius: 2,
                    }}
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
                      {item.contests}
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
