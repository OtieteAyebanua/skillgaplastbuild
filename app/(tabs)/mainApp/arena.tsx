import PageContainer from "@/components/Containers";
import { IContestCategory } from "@/services/contest";
import { Logger } from "@/services/logger";
import { Router } from "@/services/router";
import { SessionUser, User } from "@/services/user";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import ContestDetails from "../components/contest/contestDetails";

const hightestStakeContest = [
  {
    id: "dsdasd",
    image: require("../../../assets/images/image2.png"),
    title: "   Star Wars (Out Laws)",
    profileImg: require("../../../assets/images/profile-img.png"),
    stake: "20",
    tag: "  @qubigs",
    isOnline: true,
  },
  {
    id: "dsdasd",
    image: require("../../../assets/images/image2.png"),
    title: "   Star Wars (Out Laws)",
    profileImg: require("../../../assets/images/profile-img.png"),
    stake: "20",
    tag: "  @qubigs",
    isOnline: false,
  },
  {
    id: "dsdasd",
    image: require("../../../assets/images/image2.png"),
    title: "   Star Wars (Out Laws)",
    profileImg: require("../../../assets/images/profile-img.png"),
    stake: "20",
    tag: "  @qubigs",
    isOnline: false,
  },
  {
    id: "dsdasd",
    image: require("../../../assets/images/image2.png"),
    title: "   Star Wars (Out Laws)",
    profileImg: require("../../../assets/images/profile-img.png"),
    stake: "20",
    tag: "  @qubigs",
    isOnline: true,
  },
];

const AvailableContest = [
  {
    id: "dsdasd",
    title: "Table tennis",
    challenger: "@Qubigs",
    isOnline: false,
    challengerImg: require("../../../assets/images/profile-img.png"),
    stake: "50",
    timeStamp: "1 mins ago",
    group: false,
  },
  {
    id: "dsdasd",
    title: "Table tennis",
    challenger: "@Qubigs",
    isOnline: true,
    challengerImg: require("../../../assets/images/profile-img.png"),
    stake: "50",
    timeStamp: "1 mins ago",
    group: true,
  },
  {
    id: "dsdasd",
    title: "Table tennis",
    challenger: "@Qubigs",
    isOnline: false,
    challengerImg: require("../../../assets/images/profile-img.png"),
    stake: "50",
    timeStamp: "1 mins ago",
    group: false,
  },
  {
    id: "dsdasd",
    title: "Call of duty",
    challenger: "@Qubigs",
    isOnline: true,
    challengerImg: require("../../../assets/images/profile-img.png"),
    stake: "510",
    timeStamp: "1 mins ago",
    group: true,
  },

  {
    id: "dsdasd",
    title: "Call of duty",
    challenger: "@Qubigs",
    isOnline: true,
    challengerImg: require("../../../assets/images/profile-img.png"),
    stake: "510",
    timeStamp: "1 mins ago",
    group: true,
  },
  {
    id: "dsdasd",
    title: "Call of duty",
    challenger: "@Qubigs",
    isOnline: true,
    challengerImg: require("../../../assets/images/profile-img.png"),
    stake: "510",
    timeStamp: "1 mins ago",
    group: true,
  },
];

const Arena = () => {
  const [showCategories, setShowCategories] = useState(false);
  const theme = SessionUser?.preferences.darkMode;
  const [openCategories, setOpenCategories] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [showContestDetails, setShowContestDetails] = useState(false);
  const [contestID, setContestID] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const onRefresh = () => {
    User.Load();
  };

  useEffect(() => {
    Router.clearHistory();
  }, []);

  const onCategorySelected = (category: IContestCategory | null) => {
    setShowCategories(false);
    if (category) {
      Logger.info(category);
    }
  };

  return showContestDetails ? (
    <ContestDetails
      contestID={contestID}
      close={() => setShowContestDetails(false)}
    />
  ) : (
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
              width:wp("50%"),
            }}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Feather name="filter" size={16} color="#A3A3A3" />
            <Text style={{ color: "#A3A3A3", marginLeft: 8, fontSize: 14 }}>
              Categories
            </Text>
          </TouchableOpacity>
        </View>
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
            {hightestStakeContest.map((item, index) => (
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
                  setContestID(item.id);
                  setShowContestDetails(true);
                }}
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
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
                    color: theme == false ? "#000000" : "#ffffff",
                  }}
                >
                  {item.title}
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
                    <Image
                      source={item.profileImg}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9999,
                      }}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={{
                          fontSize: 12, // text-xs
                          color: theme == false ? "#000000" : "#ffffff",
                        }}
                      >
                        {item.tag}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 0,
                          color: theme == false ? "#000000" : "#ffffff",
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
                      {item.isOnline ? "Online" : "Offline"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
              color: theme == false ? "#020B12" : "#ffffff",
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
          {AvailableContest.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme == false ? "#FFFFFF" : "#1D1F20",
                borderRadius: 12,
                padding: 12,
                margin: 10,
                justifyContent: "space-between",
                marginBottom: 0,
              }}
              onPress={() => {
                setContestID(item.id);
                setShowContestDetails(true);
              }}
            >
              {/* Left Section (avatars and info) */}
              <View style={{ flexDirection: "row" }}>
                {/* Avatar 1 */}
                <Image
                  source={item.challengerImg}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    position: "relative",
                    left: 5,
                  }}
                />

                {/* Avatar 2 with "?" */}
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={
                      item.group
                        ? require("../../../assets/images/group.png")
                        : require("../../../assets/images/unknownAvatar.png")
                    }
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                    }}
                  />
                </View>

                {/* Contest Info and Status */}
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
                        color: theme == false ? "#000000" : "#FFFFFF",
                        fontWeight: "600",
                        fontSize: 12,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ color: "#A1A1AA", fontSize: 11 }}>
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
                      width: "auto",
                      height: "auto",
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

              {/* Right Section (timestamp + amount) */}
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "#A1A1AA", fontSize: 10 }}>
                  {item.timeStamp}
                </Text>
                <Text
                  style={{
                    color: theme == false ? "#000000" : "#FFFFFF",
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  ${item.stake}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
                <Categories onSelected={onCategorySelected} close={() => setShowCategories(false)} />
              </TouchableWithoutFeedback>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </PageContainer>
  );
};

export default Arena;
