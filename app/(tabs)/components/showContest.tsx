import { Contest, IContest } from "@/services/contest";
import { SessionUser } from "@/services/user";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ContestListItem } from "./contest/contestListItem";

interface ShowContestProps {
  refreshing: boolean;
}

let currentPage = 0;

const ShowContest: React.FC<ShowContestProps> = (refreshing) => {
  const theme = SessionUser?.preferences.darkMode;
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState<IContest[]>([]);

  const getMyContestList = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const data = await Contest.getMyContests(nextPage);
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
  }, [loading]);

  useEffect(() => {
    currentPage = 0;
    getMyContestList();
  }, [refreshing]);

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
      <FlatList
        data={contests}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderMyContestItem}
        //onEndReached={getMyContestList}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#aaa" />
          ) : contests.length === 0 ? (
            <Text>No data</Text>
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 10,
          flexGrow: 1,
        }}
      />
    </>
  );
};

export default ShowContest;
