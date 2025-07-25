import PageContainer from "@/components/Containers";
import { useTheme } from "@/hooks/useThemeContext";
import { Contest, IContest, IContestCategory } from "@/services/contest";
import { formatNumber } from "@/services/formValidation";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { User } from "@/services/user";
import { Ionicons } from "@expo/vector-icons";
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
import { XMarkIcon } from "react-native-heroicons/outline";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Nodata } from ".";
import Categories from "../components/categories";
import { ContestListItem } from "../components/contest/contestListItem";
import NetworkImage from "../components/networkImage";

let currentPage = 0;

const Arena = () => {
  const [showCategories, setShowCategories] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [contests, setContests] = useState<IContest[]>([]);
  const [highestContests, setHighestContests] = useState<IContest[]>([]);

  const [id, setId] = useState<number | null>(null);
  const { categoryId } = useLocalSearchParams();
  const [displayedCategory, setDisplayedCategory] = useState("");

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
      setDisplayedCategory(category?.name ?? "");
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
    const data = await Contest.getHighestStakeContests(id);
    setHighestContests(data);
  };

  const highestStakeContest = ({ item, index }: any) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: theme == false ? "#ffffff" : "#27292B",
        marginRight: 5,
        padding: 2,
        width: 160,
        borderRadius: 3,
      }}
      onPress={() => {
        Router.push(
          "/(tabs)/components/contest/myContestDetails?contestId=${contest.id}"
        );
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
        numberOfLines={1}
        style={{
          fontSize: 12,
          fontWeight: "600",
          marginTop: 1,
          color: theme === false ? "#000000" : "#ffffff",
          width: "90%",
          paddingLeft: 5,
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
            alignItems: "flex-start",
            gap: 3,
            width: "75%",
          }}
        >
          <NetworkImage
            uri={Media.GetProfileImageUris(item.owner.id ?? 0).small}
            loadingUri={require("../../../assets/images/unknownAvatar.png")}
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
            }}
          />

          <View style={{ flexDirection: "column", width: "100%" }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12, // text-xs
                color: theme === false ? "#000000" : "#ffffff",
                maxWidth: "100%",
              }}
            >
              @{item.owner.tag}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                color: "#8F8F8F",
                fontWeight: "600",
                fontSize: 12,
                width: "100%",
              }}
            >
              Stake: &#8358;{formatNumber(item.stake)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <PageContainer
      paddingBottom="0"
      backgroundColor={theme == false ? "#FAFAFA" : "#141414"}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ paddingHorizontal: 5 }}
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
              width: wp("90%"),
              margin: "auto",
              justifyContent: "space-between",
            }}
            onPress={() => setShowCategories(!showCategories)}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="filter" size={16} color="#A3A3A3" />
              <Text style={{ color: "#A3A3A3", marginLeft: 8, fontSize: 14 }}>
                {displayedCategory === "" ? "Categories" : displayedCategory}
              </Text>
            </View>
            {displayedCategory === "" ? null : (
              <TouchableOpacity
                onPress={() => {
                  setId(null);
                  setDisplayedCategory("");
                }}
              >
                <XMarkIcon width="30" height="20" color="#fff" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
        {highestContests.length > 0 ? 
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
        </View>: null}
        <View style={{ margin: "auto" }}>
          <FlatList
            horizontal={true}
            data={highestContests}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={highestStakeContest}
            //onEndReached={fetchData}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size={"large"} color={"#aaa"} />
              ) : contests.length === 0 ? (
                null
              ) : null
            }
            contentContainerStyle={{
              paddingBottom: 10,
              flexGrow: 1,
            }}
          />
        </View>
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
                <View
                  style={{
                    height: hp("28%"),
                    backgroundColor: theme ? "#27292B" : "#FFFFFF",
                  }}
                >
                  <Nodata />
                </View>
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
