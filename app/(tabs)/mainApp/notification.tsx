import PageContainer from "@/components/Containers";
import { useUserContext } from "@/hooks/useAppContext";
import { useTheme } from "@/hooks/useThemeContext";
import { formatDateDisplay } from "@/services/generateRandomHexNumber";
import { Media } from "@/services/media";
import { Router } from "@/services/router";
import { INotification, notificationsData } from "@/types/notification";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import NetworkImage from "../components/networkImage";


const Notification = () => {  
    const {theme} = useTheme();
      const [expanded, setExpanded] = useState(false);
      const {user} = useUserContext()

    const[notifications,setNotifications] = useState<INotification[]>([])
  useEffect(() => {
    Router.clearHistory();
  }, []);


  const renderItem = ({item}:{item:INotification})=>{
  const charLimit = 80;
  const isLong = item.description.length > charLimit

   const displayText = expanded
    ? item.description
    : isLong
    ? item.description.slice(0, charLimit) + "..."
    : item.description;


  const renderImgComponent = () => {
    switch (item.type) {
      case "deposit":
        return <Image
              source={
    theme === false
      ? require("../../../assets/icons/depositSuccessLight.png")
      : require("../../../assets/icons/depositSuccessDark.png")
  }
            style={{ height: 30, width: 30 }}
          />
        case "withdraw":
          return <Image
          source={
    theme === false
      ? require("../../../assets/icons/depositFailedLight.png")
      : require("../../../assets/icons/depositFailedDark.png")
  }
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
      default:
        return <NetworkImage
            loadingUri={require("../../../assets/images/profile-img.png")}
            uri={Media.GetCategoryImageUris(user?.id ?? 0).original}
            style={{ height: 30, width: 30 }}
          />
    }
  };
    return(
      <TouchableOpacity 
      onPress={() => { 
          {item.type === "deposit" || item.type === "withdraw"
  ? Router.push(
      `/mainApp/wallet?transactionId=${item.transactionId}`
    )
  : Router.push(
      `/(tabs)/components/contest/myContestDetails?contestId=${item.constId}`
    )}
      }}
      >
      <View
            style={{
              width: "92%",
              marginHorizontal: "auto",
              backgroundColor: theme == false ? "#ffffff" : "#1D1F20",
              borderRadius: 8,
              flexDirection: "column",
              padding: 10,
              gap: 10,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row",alignItems:"flex-start",gap:7 }}>
            {renderImgComponent()}
              <View>
                <View
                  style={{
                    width: wp("80%"),
                    marginBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      overflow:"hidden"
                    }}
                  >
                    <Text
                    numberOfLines={1}
                      style={{
                        color: theme === false ? "#000":"#ffffff",
                        fontSize: 12,
                        fontWeight: "600",
                        width:100
                      }}
                    >
                      {item.header}
                    </Text>
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: 12,
                        marginHorizontal: 8,
                      }}
                    >
                      { formatDateDisplay(item.time)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: theme === false ? "#000": "#ffffff",
                      fontSize: 10,
                      fontWeight: "500",
                      paddingRight:5
                    }}
                  >
                    {item.type}
                  </Text>
                </View>
               <View style={{ flexDirection: "row", flexWrap: "wrap", width: "70%" }}>
      <Text
        style={{
          color: "#9ca3af",
          fontSize: 12,
        }}
      >
        {displayText}{" "}
      </Text>
      {isLong && (
        <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
          <Text
            style={{
              color: "#3b82f6",
              fontWeight: "500",
            }}
          >
            {expanded ? "See less" : "See more"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
              </View>
            </View>

            {item.type === "request" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  
                }}
              >
                <TouchableOpacity
                onPress={() => {
        Router.push(
          `/(tabs)/components/contest/myContestDetails?contestId=${item.constId}`
        );
      }}
                  style={{
                    width: "40%",
                    alignItems: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    borderRadius: 9999,
                    borderWidth: 2,
                    borderColor: "#1D9BF0",
                  }}
                >
                  <Text
                    style={{
                      color: "#1D9BF0",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => {
        Router.push(
          `/(tabs)/components/contest/myContestDetails?contestId=${item.constId}`
        );
      }}
                  style={{
                    width: "40%",
                    alignItems: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    borderRadius: 9999,
                    backgroundColor: "#3b82f6",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null} 
          </View> 
      </TouchableOpacity>
    )
  }

  return (
    <PageContainer backgroundColor={theme == false ? "" : "#141414"}>
      <ScrollView>
        <View
          style={{
            marginBottom: "10%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >


          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme == false ? "#020B12" : "#ffffff",
            }}
          >
            Notifications
          </Text>
        </View>
        <FlatList renderItem={renderItem} data={notificationsData}/>
      </ScrollView>
    </PageContainer>
  );
};

export default Notification;
