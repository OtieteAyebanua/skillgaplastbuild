import { Router } from "@/services/router";
import { SessionUser } from "@/services/user";
import { fetchTestData } from "@/types/testingInfiniteScrol";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

const ShowContest = () => {
  const theme = SessionUser?.preferences.darkMode;
  const [isMyContest, setIsMyContest] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [AvailableContest, setAvailableContest] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getMyContestList = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const data = fetchTestData(currentPage); // Replace with actual fetch logic

      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setAvailableContest((prev) => [...prev, ...data]);
        setCurrentPage((prev) => prev + 1);
      }

      setLoading(false);
    }, 2000);
  }, [loading, hasMore, currentPage]);
  useEffect(() => {
    getMyContestList();
  }, [getMyContestList]);

  const renderMyContestItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme == false ? "#FFFFFF" : "#1D1F20",
        borderRadius: 12,
        padding: 12,
        margin: 10,
        paddingHorizontal: 3,
        justifyContent: "space-between",
        marginBottom: 0,
        marginHorizontal: 0,
        paddingRight: 10,
      }}
      onPress={() => {
        Router.push("/(tabs)/components/contest/myContestDetails");
      }}
    >
      {/* Left Section */}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item.challengerImg}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            position: "relative",
            left: 5,
          }}
        />
        <View style={{ alignItems: "center" }}>
          {item.group ? (
            <Image
              source={require("../../../assets/images/group.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <Image
              source={require("../../../assets/images/unknownAvatar.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 10,
            position: "relative",
            right: 6,
          }}
        >
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                color: theme == false ? "#000000" : "#FFFFFF",
                fontWeight: "600",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "#A1A1AA", fontSize: 12 }}>
              {item.group ? "group Contest" : `${item.challenger} vs ?`}
            </Text>
          </View>
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
            }}
          >
            <Text
              style={{
                fontFamily: "General Sans Variable",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 10,
                lineHeight: 12,
                letterSpacing: -0.06,
                color: "#2A9D0D",
              }}
            >
              {item.isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Section */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: "#A1A1AA", fontSize: 10 }}>{item.timeStamp}</Text>
        <Text
          style={{
            color: theme == false ? "#000000" : "#FFFFFF",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          ${item.stake}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderAvailableContestItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme === false ? "#FFFFFF" : "#1D1F20",
        borderRadius: 12,
        padding: 12,
        margin: 10,
        paddingHorizontal: 3,
        justifyContent: "space-between",
        marginBottom: 0,
        marginHorizontal: 0,
        paddingRight: 10,
      }}
      onPress={() => {
        // router.push("/(tabs)/contest/contestDetails");
      }}
    >
      {/* Left Section */}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item.challengerImg}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            position: "relative",
            left: 5,
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Image
            source={
              item.group
                ? require("../../../assets/images/group.png")
                : require("../../../assets/images/unknownAvatar.png")
            }
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 10,
            position: "relative",
            right: 8,
          }}
        >
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                color: theme === false ? "#000000" : "#FFFFFF",
                fontWeight: "600",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "#A1A1AA", fontSize: 12 }}>
              {item.group ? "group Contest" : `${item.challenger} vs ?`}
            </Text>
          </View>
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
            }}
          >
            <Text
              style={{
                fontFamily: "General Sans Variable",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 10,
                lineHeight: 12,
                letterSpacing: -0.06,
                color: "#2A9D0D",
              }}
            >
              {item.isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Section */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: "#A1A1AA", fontSize: 10 }}>{item.timeStamp}</Text>
        <Text
          style={{
            color: theme === false ? "#000000" : "#FFFFFF",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          ${item.stake}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderColor: "#BFDBFE",
          borderWidth: 1,
          borderRadius: 9999,
          paddingHorizontal: 16,
        }}
      >
        <MagnifyingGlassIcon size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          style={{
            flex: 1,
            marginHorizontal: 8,
            fontSize: 16,
            color: "#374151",
          }}
        />
        <AdjustmentsHorizontalIcon size={20} color="#6B7280" />
      </View>
    </View>
  );

  return (
    <>
      <View
        style={{
          borderRadius: 100,
          flexDirection: "row",
          backgroundColor: theme == false ? "#EDEFF1" : "#1D1F20",
          width: 200,
          overflow: "hidden",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: isMyContest ? "#E7F4FD" : "transparent",
            borderRadius: 100,
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity onPress={() => setIsMyContest(true)}>
            <Text
              style={{
                fontFamily: "General Sans Variable",
                fontStyle: "normal",
                fontWeight: "700", // font-semibold
                fontSize: 16, // text-base
                letterSpacing: -0.16, // ~-0.01em
                color: theme == false ? "#020B12" : "#8F8F8F",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              My Contest
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: isMyContest ? "transparent" : "#E7F4FD",
            borderRadius: 100,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => setIsMyContest(false)}>
            <Text
              style={{
                fontFamily: "General Sans Variable",
                fontStyle: "normal",
                fontWeight: "700", // font-semibold
                fontSize: 16, // text-base
                letterSpacing: -0.16, // ~-0.01em
                color: theme == false ? "#020B12" : "#8F8F8F",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              Available Contest
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isMyContest ? (
        <FlatList
          data={AvailableContest}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderMyContestItem}
          onEndReached={() => {
            if (!loading && hasMore) getMyContestList();
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#aaa" /> : null
          }
          contentContainerStyle={{
            paddingBottom: 10,
            flexGrow: 1,
          }}
        />
      ) : (
         <FlatList
          data={AvailableContest}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderMyContestItem}
          onEndReached={() => {
            if (!loading && hasMore) getMyContestList();
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#aaa" /> : null
          }
          contentContainerStyle={{
            paddingBottom: 10,
            flexGrow: 1,
          }}
          ListHeaderComponent={ListHeader}
        />
      )}
    </>
  );
};

export default ShowContest;
