import { useTheme } from "@/hooks/useThemeContext";
import { Contest, IContest } from "@/services/contest";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Nodata } from "../mainApp";
import { ContestListItem } from "./contest/contestListItem";
interface ShowContestProps {
  refreshing: boolean;
}

let currentPage = 0;

const ShowContest: React.FC<ShowContestProps> = (refreshing) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState<IContest[]>([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  async function getMyContestList() {
    if (loading) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const data = await Contest.getMyContests(nextPage);
      if (data.length <= 0) {
        setLoading(true);
      } else {
        setContests((prev) => [...prev, ...data]);
        currentPage = nextPage;
        setIsDataAvailable(true);
      }
      // if (nextPage === 1) {
      //   setContests(data);
      // } else {
      //   setContests((prev) => [...prev, ...data]);
      // }

      // if (data.length > 0) {
      //   currentPage = nextPage;
      // }
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      currentPage = 0;
      getMyContestList();
    }, [refreshing])
  );

  const renderMyContestItem = ({ item }: { item: IContest }) => (
    <ContestListItem contest={item} />
  );

  return (
    <>
      <View
        style={{
          borderRadius: 100,
          flexDirection: "row",
          width: 200,
          overflow: "hidden",
          justifyContent: "space-between",
        }}
      >
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
      </View>
      <View style={{ height: hp("28%") }}>
        {" "}
        <FlatList
          data={contests}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderMyContestItem}
          // onEndReached={getMyContestList}
          onEndReachedThreshold={0}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" color="#aaa" />
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
    </>
  );
};

export default ShowContest;
