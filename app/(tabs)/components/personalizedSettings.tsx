import PageContainer from "@/components/Containers";
import Input from "@/components/ui/Input";
//import { useDebounce } from "@/services/helpers/formValidation";

import { Router } from "@/services/router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { ConfirmModal, WarningModal } from "./modals";

const Personalized = () => {
  const theme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [blockUser, setBlockUser] = useState(false);
  const [onChangeDelete, setOnChangeDelete] = useState(false);
  const [blockedList, setBlockList] = useState([
    {
      id: "",
      fullName: "dasdsda",
      country: "",
      imageUri: "",
      tag: "ayebanua",
      bio: null,
      socials: {
        twitter: "",
        facebook: "",
        tikTok: "",
        youtube: "",
      },
      stats: {
        contests: 0,
        wins: 0,
        losses: 0,
        disputes: 0,
      },
    },
  ]);
  const [skillTag, setSkillTag] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockProcessSuccessful, setIsBlockProcessSuccessful] =
    useState(false);

  // const handleConfirm = () => {
  //   if (api && !isLoading) {
  //     setIsLoading(true);
  //     blockUserApi(api, skillTag)
  //       .then((res) => {
  //         if (res) {
  //           setIsLoading(false);
  //           setIsBlockProcessSuccessful(true);
  //           return;
  //         } else {
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   if (api) {
  //     getBlockedList(api)
  //       .then((res: any) => {
  //         if (res) {
  //           setBlockList(res.data);
  //         }
  //       })
  //       .catch(() => {});
  //   }
  // }, [onChangeDelete]);

  // const debouncedSearch = useCallback(
  //   useDebounce(() => {
  //     getTagAvailability();
  //   }, 100),
  //   [skillTag]
  // );
  // useEffect(() => {
  //   debouncedSearch();
  // }, [skillTag]);

  // const getTagAvailability = () => {
  //   if (api) {
  //     isTagAvailable(api, skillTag)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data) {
  //           setError(true);
  //         } else {
  //           setError(false);
  //         }
  //       })
  //       .catch(() => setError(true));
  //   }
  // };
  // const handleUnblockUser = (tag: string) => {
  //   console.log("me");
  //   if (api) {
  //     unBlockUser(api, tag)
  //       .then((res) => {
  //         if (res) {
  //           setOnChangeDelete((prev) => !prev);
  //           setModalVisible(false);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("don't know ", err);
  //       });
  //   }
  // };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme === "light" ? "#EDEFF1" : "#1D1F20",
      borderRadius: 100,
      padding: 5,
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      alignSelf: "center",
      marginBottom:5
    },
    blockButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 100,
      alignItems: "center",
      backgroundColor: blockUser
        ? "transparent"
        : theme === "light"
        ? "#FFFFFF"
        : "#141414",
    },
    viewBlockListButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 100,
      backgroundColor: blockUser
        ? theme === "light"
          ? "#FFFFFF"
          : "#141414"
        : "transparent",
      alignItems: "center",
    },
    text: {
      color: "#8F8F8F",
      fontSize: 16,
    },
  });

  const BlockedStyles = StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#FFFFFF" : "#121212",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme === "light" ? "#F7F7F7" : "#27292B",
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    statusDot: {
      width: 10,
      height: 10,
      backgroundColor: "#00FF00",
      borderRadius: 5,
      position: "absolute",
      bottom: 5,
      left: 40,
    },
    username: {
      color: theme === "light" ? "#020B12" : "#FFF",
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 10,
    },
    dateBlocked: {
      color: "#AAA",
      fontSize: 9,
      marginLeft: 10,
    },
    unblockButton: {
      backgroundColor: "#1D9BF0",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    unblockText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "bold",
    },
  });

  const BlockUserStyles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
    },
    title: {
      color: theme == "light" ? "#020B12" : "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    description: {
      color:theme === "light" ?  "#333333" : "#fff",
      fontSize: 14,
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: "row", 
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#444",
      borderRadius: 100,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    input: {
      flex: 1,
      color: "#FFF",
      fontSize: 16,
    },
    icon: {
      marginLeft: 10,
    },
    inputError: {
      borderColor: "#FF4444",
    },
    errorText: {
      color: "#FF4444",
      fontSize: 10,
      marginTop: 5,
    },
    confirmButton: {
      backgroundColor: "#1E90FF",
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: "center",
      marginTop: 20,
    },
    confirmText: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <PageContainer backgroundColor={theme === "light" ? "" : "#141414"}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12, // mb-3 → 3 × 4
          }}
        >
          <View style={{ position: "absolute", top: 0, left: 12 }}>
            <TouchableOpacity
              onPress={() => {
                Router.back();
              }}
              style={{
                paddingLeft: 3,
                marginBottom: 24, // mb-6 → 6 × 4
                width: 30, // w-[30px]
                borderRadius: 9999,
              }}
            >
              <ChevronLeftIcon size={25} color={"#292D32"} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 16, // text-base
              fontWeight: "600", // font-semibold
              color: theme === "light" ? "#020B12" : "#FFFFFF",
            }}
          >
            Personalized Settings
          </Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setBlockUser(false)}
            style={styles.blockButton}
          >
            <Text style={styles.text}>Block User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBlockUser(true)}
            style={styles.viewBlockListButton}
          >
            <Text style={styles.text}>View Block List</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {blockUser ? (
          <View>
            <View
              style={{ paddingTop: 30, paddingLeft: 20, paddingBottom: 10 }}
            >
              <Text
                style={
                  theme === "light"
                    ? { color: "#020B12", fontWeight: "bold", fontSize: 16 }
                    : { color: "#FFF", fontWeight: "bold", fontSize: 16 }
                }
              >
                Blocked Users
              </Text>
            </View>
            <View>
              <ScrollView>
                {blockedList.map((item: any) => (
                  <View style={BlockedStyles.itemContainer}>
                    <View style={BlockedStyles.userInfo}>
                      <Image
                        source={
                          item.imageUri
                            ? { uri: item.imageUri }
                            : require("../../../assets/images/profile-img.png")
                        }
                        style={BlockedStyles.avatar}
                      />
                      <View style={BlockedStyles.statusDot} />
                      <View>
                        <Text style={BlockedStyles.username}>@{item.tag}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={BlockedStyles.unblockButton}
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <Text style={BlockedStyles.unblockText}>unblock</Text>
                    </TouchableOpacity>
                    {modalVisible ? (
                      <WarningModal
                        text=" Are you sure you want to unblock this Skillgap account?"
                        cancel={() => {
                          setModalVisible(false);
                        }}
                        proceed={() => {}}
                      />
                    ) : null}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={BlockUserStyles.container}>
            <Text style={BlockUserStyles.title}>Block a user</Text>
            <Text style={BlockUserStyles.description}>
              If you block this user you won't be able to see and partake in any
              contest hosted by them
            </Text>

            <Input
              type="text"
              placeholder="Enter Skillgap tag"
              value={(e) => setSkillTag(e)}
              isError={error}
            />

            {error ? (
              <Text style={BlockUserStyles.errorText}>
                This Skill gap tag was incorrect or does not exist on our
                database
              </Text>
            ) : null}
            <TouchableOpacity
              disabled={error ? true : false}
              style={BlockUserStyles.confirmButton}
              //  onPress={handleConfirm}
            >
              <Text style={BlockUserStyles.confirmText}>
                {isLoading ? (
                  <ActivityIndicator size={30} color={"#ffffff"} />
                ) : (
                  "Confirm"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isBlockProcessSuccessful ? (
          <ConfirmModal
            text={skillTag}
            proceed={() => {
              setIsBlockProcessSuccessful(false);
              setBlockUser(true);
            }}
            cancel={() => setIsBlockProcessSuccessful(false)}
          />
        ) : null}
      </ScrollView>
    </PageContainer>
  );
};

export default Personalized;
