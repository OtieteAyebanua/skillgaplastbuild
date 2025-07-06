import PageContainer from "@/components/Containers";
import { Contest, IContest, IContestCategory } from "@/services/contest";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { SessionUser, User } from "@/services/user";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import { ContestListItem } from "../components/contest/contestListItem";
import NetworkImage from "../components/networkImage";

let currentPage = 0;

const Arena = () => {
  const [showCategories, setShowCategories] = useState(false);
  const theme = SessionUser?.preferences.darkMode;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [contests, setContests] = useState<IContest[]>([]);
  const [highestContests, setHighestContests] = useState<IContest[]>([]);

  const [id, setId] = useState<number | null>(null);
  const { categoryId } = useLocalSearchParams();

  const onRefresh = () => {
    User.Load();
    currentPage = 0;
    setId(null);
  };

  useEffect(() => {
    Router.clearHistory();
    if (categoryId) {
      setId(Number(categoryId));
    }
  }, [categoryId]);

  useEffect(() => {
    currentPage = 0;
    fetchData();
    fetchHighestStakeData();
  }, [id]);

  const onCategorySelected = (categories: IContestCategory[]) => {
    setShowCategories(false);
    if (categories) {
      currentPage = 0;
      const category = categories.pop();
      setId(category?.id ?? null);
    }
  };

  const renderContestListItem = ({ item }: { item: IContest }) => (
    <ContestListItem contest={item} />
  );

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const data = await Contest.getOpenContests(nextPage, id);
      if (nextPage === 1) {
        setContests(data);
      } else {
        setContests((prev) => [...prev, ...data]);
      }

      if (data.length > 0) {
        currentPage = nextPage;
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchHighestStakeData = async () => {
    const data = await Contest.getHighestStakeContests(null);
    setHighestContests(data);
  };

  return (
    <PageContainer
      paddingBottom="0"
      backgroundColor={theme == false ? "#FAFAFA" : "#141414"}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {" "}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme == false ? "#020B12" : "#ffffff",
            }}
          >
            Arena
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme == false ? "#F2F2F7" : "#27292B",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 8,
              width: wp("50%"),
            }}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Feather name="filter" size={16} color="#A3A3A3" />
            <Text style={{ color: "#A3A3A3", marginLeft: 8, fontSize: 14 }}>
              Categories
            </Text>
          </TouchableOpacity>
        </View>
        {highestContests.length > 0 && (
          <>
            <View>
              <Text
                style={{
                  width: 171,
                  height: 24,
                  fontFamily: "General Sans Variable",
                  fontStyle: "normal",
                  fontWeight: "700", // equivalent to font-semibold
                  fontSize: 16, // text-base
                  lineHeight: 24,
                  letterSpacing: -0.16, // -0.01em * 16px
                  color: theme == false ? "#020B12" : "#ffffff",
                  flex: 0,
                  flexGrow: 0,
                  paddingLeft: 10,
                  marginBottom: 10,
                  marginTop: 15,
                }}
              >
                Highest Stake Contest
              </Text>
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {highestContests.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: theme == false ? "#ffffff" : "#27292B",
                      marginRight: 5,
                      padding: 4,
                      width: 130,
                      borderRadius: 3,
                    }}
                    onPress={() => {
                      Router.push("/components/contest/contestDetails");
                    }}
                  >
                    <NetworkImage
                      loadingUri={require("../../../assets/images/icon.png")}
                      uri={Media.GetCategoryImageUris(item.id)?.original}
                      style={{
                        width: "100%",
                        height: 165,
                        borderRadius: 5, // rounded-lg
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        marginTop: 1,
                        color: theme === false ? "#000000" : "#ffffff",
                      }}
                    >
                      {item.category.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      {/* Avatar and Username */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <NetworkImage
                          uri={
                            Media.GetProfileImageUris(item.owner.id ?? 0).small
                          }
                          loadingUri={require("../../../assets/images/unknownAvatar.png")}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            position: "relative",
                            left: 5,
                          }}
                        />

                        <View style={{ flexDirection: "column" }}>
                          <Text
                            style={{
                              fontSize: 12, // text-xs
                              color: theme === false ? "#000000" : "#ffffff",
                            }}
                          >
                            @{item.owner.tag}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 0,
                              color: theme === false ? "#000000" : "#ffffff",
                            }}
                          >
                            Stake:{" "}
                            <Text
                              style={{
                                color: "#8F8F8F",
                                fontWeight: "600",
                              }}
                            >
                              ${item.stake}
                            </Text>
                          </Text>
                        </View>
                      </View>

                      {/* Online/Offline Badge */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingHorizontal: 4,
                          backgroundColor: "#E2FEE6",
                          borderWidth: 1,
                          borderColor: "#78F98D",
                          borderRadius: 39,
                          height: "auto",
                          width: "auto",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "General Sans Variable",
                            fontSize: 9,
                            color: "#2A9D0D",
                          }}
                        >
                          {item.owner.isOnline ? "Online" : "Offline"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
        <View>
          <Text
            style={{
              width: 171,
              height: 24,
              fontFamily: "General Sans Variable",
              fontStyle: "normal",
              fontWeight: "700", // font-semibold
              fontSize: 16, // text-base
              lineHeight: 24,
              letterSpacing: -0.16, // -0.01em * 16px
              color: theme === false ? "#020B12" : "#ffffff",
              flex: 0,
              flexGrow: 0,
              paddingLeft: 10,
              marginBottom: 10,
              marginTop: 15,
            }}
          >
            Available Contest
          </Text>
        </View>
        <View style={{ paddingBottom: 15 }}>
          <FlatList
            data={contests}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderContestListItem}
            //onEndReached={fetchData}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size={"large"} color={"#aaa"} />
              ) : contests.length === 0 ? (
                <Text>No Data</Text>
              ) : null
            }
            contentContainerStyle={{
              paddingBottom: 10,
              flexGrow: 1,
            }}
          />
        </View>
      </ScrollView>
      <Modal
        visible={showCategories}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategories(false)}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              height: "100%",
            }}
          >
            <BlurView
              intensity={80}
              tint="systemMaterialDark"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback>
                <Categories
                  onSelected={onCategorySelected}
                  close={() => setShowCategories(false)}
                />
              </TouchableWithoutFeedback>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </PageContainer>
  );
};

export default Arena;
