import { useTheme } from "@/hooks/useThemeContext";
import { Contest, ITrendingCategory } from "@/services/contest";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NetworkImage from "./networkImage";

interface TrendingCategoryProps {
  refreshing: boolean;
}
const TrendingCategory: React.FC<TrendingCategoryProps> = (refreshing) => {
  const { theme } = useTheme();

  const [categories, setCategories] = useState<ITrendingCategory[]>([]);

  useEffect(() => {
    Contest.getTrendingCategories().then((data) => {
      setCategories(data ?? []);
    });
  }, [refreshing]);

  const routeToArena = (category: ITrendingCategory) => {
    Router.push(`/(tabs)/mainApp/arena?categoryId=${category.id}&categoryName=${category.name}`);
  };

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
                <TouchableOpacity
                  key={item.id}
                  onPress={() => routeToArena(item)}
                >
                  <View
                    style={{
                      padding: 4, // p-1
                      paddingLeft: 8, // pl-2
                      paddingRight: 8, // pr-2
                      paddingTop: 10, // pt-2
                      backgroundColor: theme == false ? "#ffffff" : "#27292B",
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
                        resizeMode: "cover",
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        color: theme == false ? "#020B12" : "#ffffff",
                        width: 125,
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
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: theme == false ? "#000000" : "#8F8F8F",
                          fontSize: 10,
                          width: 60,
                        }}
                      >
                        <Text
                          style={{
                            color: theme == false ? "#000000" : "#ffffff",
                            fontSize: 12,
                          }}
                        >
                          Bets :
                        </Text>
                        {item.contests}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: theme == false ? "#000000" : "#8F8F8F",
                          fontSize: 10,
                          width: 60,
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
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TrendingCategory;
