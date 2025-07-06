import { IContest } from "@/services/contest";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { SessionUser } from "@/services/user";
import { formatMoney } from "@/utitlity/string";
import { Text, TouchableOpacity, View } from "react-native";
import NetworkImage from "../networkImage";

interface ContestListItemProps {
  contest: IContest;
}

export const ContestListItem: React.FC<ContestListItemProps> = ({
  contest,
}) => {
  const theme = SessionUser?.preferences.darkMode;

  const isOnline =
    contest.ownerId === SessionUser?.id
      ? contest.opponent?.isOnline
      : contest.owner.isOnline;

  const state =
    contest.state === "pending"
      ? "10 min ago"
      : contest.state === "disputed"
      ? "Disputed"
      : contest.state === "ongoing"
      ? "ongoing"
      : contest.winnedId === SessionUser?.id
      ? "Won"
      : "Lost";

  const stateColor = ["pending", "disputed", "ongoing"].includes(contest.state)
    ? "#A1A1AA"
    : contest.winnedId === SessionUser?.id
    ? "#2A9D0D"
    : "#FB5631";

  const stake = formatMoney(contest.stake);

  return (
    <TouchableOpacity
      key={contest.id}
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
        Router.push(
          `/(tabs)/components/contest/myContestDetails?contestId=${contest.id}`
        );
      }}
    >
      {/* Left Section */}
      <View style={{ flexDirection: "row" }}>
        <NetworkImage
          uri={Media.GetProfileImageUris(contest.owner.id ?? 0).small}
          loadingUri={require("../../../../assets/images/unknownAvatar.png")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            position: "relative",
            left: 5,
          }}
        />

        <View style={{ alignItems: "center" }}>
          <NetworkImage
            uri={Media.GetProfileImageUris(contest.opponent?.id ?? 0).small}
            loadingUri={require("../../../../assets/images/unknownAvatar.png")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
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
                color: theme === false ? "#000000" : "#FFFFFF",
                fontWeight: "600",
              }}
            >
              {contest.category.name}
            </Text>
            <Text style={{ color: "#A1A1AA", fontSize: 12 }}>
              @{contest.owner.tag}{" "}
              <Text
                style={{
                  fontWeight: 600,
                  color: theme === false ? "#000000" : "#FFFFFF",
                }}
              >
                {" vs "}
              </Text>
              {contest.opponent ? ` @${contest.opponent?.tag}` : "  ?"}
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
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Section */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: stateColor, fontSize: 10 }}>{state}</Text>
        <Text
          style={{
            color: theme === false ? "#000000" : "#FFFFFF",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          #{stake.left}.{stake.right}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
