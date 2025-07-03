import PageContainer from "@/components/Containers";
import { Router } from "@/services/router";
import { SessionUser } from "@/services/user";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import OfflineContest from "./offlineContest";


interface ICategories {
  id: number;
  name: string;
  color: string;
}

const Contest = () => {
  const [isOnline, setIsOnline] = useState(true);
  const theme = SessionUser?.preferences.darkMode;
  const [characterValue, setCharacterValue] = useState("");
  const maxChars = 50;
  const [isLoading, setIsLoading] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(true);

  const [categories, setCategories] = useState<ICategories[]>([
    {
      id: 1,
      name: "Sport",
      color: "#6700D6",
    },
    {
      id: 2,
      name: "Football",
      color: "#4AF766",
    },
    {
      id: 3,
      name: "Ball Joggling",
      color: "#FFDA44",
    },
    {
      id: 4,
      name: "Ball Joggling",
      color: "#2A9D0D",
    },
    {
      id: 5,
      name: "Ball Joggling",
      color: "#1D9BF0",
    },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<ICategories[]>(
    []
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: theme == false ? "#EDEFF1" : "#1D1F20",
      borderRadius: 100,
      padding: 5,
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      alignSelf: "center",
    },
    blockButton: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 100,
      alignItems: "center",
      backgroundColor: isOnline
        ? "transparent"
        : theme == false
        ? "#FFFFFF"
        : "#141414",
    },
    viewBlockListButton: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 100,
      backgroundColor: isOnline
        ? theme == false
          ? "#FFFFFF"
          : "#141414"
        : "transparent",
      alignItems: "center",
    },
    text: {
      color: "#8F8F8F",
      fontSize: 14,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // adjust as needed
    >
      <PageContainer backgroundColor={theme == false ? "" : "#141414"}>
        <ScrollView
          style={{
            marginBottom: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10%", // originally 'mb-3' but overridden
            }}
          >
            {/* <TouchableOpacity
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
  </TouchableOpacity> */}

            <Text
              style={{
                fontSize: 16, // 'text-base' → 16px
                fontWeight: "600", // 'font-semibold'
                color: theme == false ? "#020B12" : "#ffffff",
                paddingTop: 30
              }}
            >
              Create Contest
            </Text>
          </View>
          <View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => setIsOnline(true)}
                style={styles.viewBlockListButton}
              >
                <Text style={styles.text}>Online</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsOnline(false)}
                style={styles.blockButton}
              >
                <Text style={styles.text}>Offline</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isOnline ? (
            <>
              <View
                style={{
                  backgroundColor: theme == false ? "#ffffff" : "#1D1F20",
                  borderColor: theme == false ? "#E7F4FD" : "#27292B",
                  width: "90%",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: 10,
                  marginTop: 20,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "left",
                        fontWeight: "600",
                        color: theme == false ? "#000" : "#fff",
                        paddingBottom: 5,
                      }}
                    >
                      Open challenge
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#8F8F8F",
                        fontWeight: "400",
                      }}
                    >
                      This will enable you to invite other users to join your
                      contest
                    </Text>
                  </View>
                  <Switch
                    value={isChallengeOpen}
                    onValueChange={() => {
                      setIsChallengeOpen((prev) => !prev);
                    }}
                    style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>

                {/* Divider */}
                <View
                  style={{
                    width: 306,
                    height: 0,
                    borderTopWidth: 1,
                    borderColor: theme == false ? "#F7F7F7" : "#27292B",
                    marginTop: 10,
                    paddingBottom: 10,
                  }}
                />

                {/* Conditional Rendering */}
                {isChallengeOpen ? (
                  <>
                    <Text
                      style={{
                        fontFamily: "General Sans Variable",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: 14,
                        color: theme == false ? "#000" : "#fff",
                      }}
                    >
                      Opponent's skillgap tag
                    </Text>
                    <TextInput
                      placeholder="e.g @skillgap"
                      placeholderTextColor={
                        theme == false ? "#000000" : "#ffffff"
                      }
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: "#D0D5DD",
                        width: "97%",
                        height: 40,
                        marginLeft: "auto",
                        marginRight: "auto",
                        color: theme == false ? "#000000" : "#ffffff",
                        marginTop: 10,
                        padding: 5,
                        paddingLeft: 10,
                        fontSize: 11,
                      }}
                    />
                  </>
                ) : (
                  <View>
                    <Text
                      style={{
                        width: "96%",
                        height: 21,
                        fontFamily: "General Sans Variable",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: 14,
                        lineHeight: 21,
                        letterSpacing: -0.01,
                        marginLeft: "auto",
                        marginRight: "auto",
                        color: "#8F8F8F",
                      }}
                    >
                      Opponent’s skillgap tag
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: "#D0D5DD",
                        width: "97%",
                        height: 40,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 10,
                        padding: 5,
                        paddingLeft: 10,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#8F8F8F",
                        }}
                      >
                        @skillgap
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  backgroundColor: theme == false ? "#ffffff" : "#1D1F20",
                  borderColor: theme == false ? "#E7F4FD" : "#27292B",
                  borderWidth: 1,
                  borderRadius: 8,
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    width: "96%",
                    height: 21,
                    fontFamily: "General Sans Variable",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 14,
                    lineHeight: 21,
                    letterSpacing: -0.01,
                    flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: theme == false ? "#000" : "#fff",
                  }}
                >
                  Select Categories
                </Text>

                <Text
                  style={{
                    width: "98%",
                    fontFamily: "General Sans Variable",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: 10,
                    lineHeight: 15,
                    marginLeft: "auto",
                    color: "#8F8F8F",
                  }}
                >
                  All result from your selections ranging from main to sub
                  categories
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                    flexWrap: "wrap",
                    rowGap: 10,
                    columnGap: 20,
                  }}
                >
                  {categories.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        width: 84,
                        height: 32,
                        borderStyle: "dashed",
                        borderColor: item.color,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderRadius: 16,
                        backgroundColor: theme == false ? "#fff" : "#27292B",
                      }}
                      onPress={() => {
                        setSelectedCategories((prev) => [...prev, item]);
                        setCategories((prev) =>
                          prev.filter((cat) => cat.id !== item.id)
                        );
                      }}
                    >
                      <Text
                        style={{
                          color: item.color,
                          fontSize: 10,
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 2,
                    marginTop: 15,
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#D0D5DD",
                    borderRadius: 20,
                  }}
                />

                <Text
                  style={{
                    width: "96%",
                    height: 21,
                    fontFamily: "General Sans Variable",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 14,
                    lineHeight: 21,
                    letterSpacing: -0.01,
                    flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    color: theme == false ? "#000" : "#fff",
                  }}
                >
                  Selected Categories
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                    flexWrap: "wrap",
                    rowGap: 10,
                    columnGap: 20,
                  }}
                >
                  {selectedCategories.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        width: 84,
                        height: 32,
                        borderStyle: "dashed",
                        borderColor: "#1D9BF0",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderRadius: 16,
                        backgroundColor: "transparent",
                      }}
                      onPress={() => {
                        setCategories((prev) => [...prev, item]);
                        setSelectedCategories((prev) =>
                          prev.filter((cat) => cat.id !== item.id)
                        );
                      }}
                    >
                      <Text
                        style={{
                          color: "#1D9BF0",
                          fontSize: 10,
                          fontWeight: "500",
                        }}
                      >
                        #{item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: theme == false ? "#ffffff" : "#1D1F20",
                  borderColor: theme == false ? "#E7F4FD" : "#27292B",
                  borderWidth: 1,
                  borderRadius: 8,
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    width: "96%",
                    height: 21,
                    fontFamily: "General Sans Variable",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 14,
                    lineHeight: 21,
                    letterSpacing: -0.01,
                    flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    color: theme == false ? "#000" : "#fff",
                  }}
                >
                  Stake
                </Text>

                <TextInput
                  placeholder="$5"
                  placeholderTextColor={
                    theme == false ? "#000000" : "#ffffff"
                  }
                  inputMode="numeric"
                  style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "#242628",
                    width: "99%",
                    height: 40,
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: theme == false ? "#000000" : "#ffffff",
                    marginTop: 10,
                    padding: 5,
                    paddingLeft: 10,
                    fontSize: 14,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight: 10,
                    columnGap: 3,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      height: 17,
                      fontFamily: "General Sans Variable",
                      fontStyle: "italic",
                      fontWeight: "400",
                      fontSize: 11,
                      lineHeight: 16.5,
                      letterSpacing: -0.121,
                      color: "#8F8F8F",
                    }}
                  >
                    Balance:
                  </Text>
                  <Text
                    style={{
                      height: 17,
                      fontFamily: "General Sans Variable",
                      fontStyle: "italic",
                      fontWeight: "400",
                      fontSize: 11,
                      lineHeight: 16.5,
                      color: theme == false ? "#000" : "#fff",
                    }}
                  >
                    $300
                  </Text>
                </View>

                <Text
                  style={{
                    width: "96%",
                    height: 21,
                    fontFamily: "General Sans Variable",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 14,
                    lineHeight: 21,
                    letterSpacing: -0.01,
                    flexGrow: 0,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    color: theme == false ? "#000" : "#fff",
                  }}
                >
                  Terms and Description
                </Text>
                <TextInput
                  multiline
                  maxLength={maxChars}
                  value={characterValue}
                  onChangeText={setCharacterValue}
                  placeholderTextColor="#8F8F8F"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "98%",
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "#27292B",
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 14,
                    color: "#8F8F8F",
                    textAlignVertical: "top",
                  }}
                />

                <View
                  style={{
                    width: "100%",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      height: 16,
                      fontFamily: "General Sans Variable",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: 10,
                      lineHeight: 16,
                      textAlignVertical: "center",
                      width: 30,
                      marginTop: 5,
                      color: "#8F8F8F",
                    }}
                  >
                    {characterValue.length}/{maxChars}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  Router.push("/(tabs)/components/contest/successfullyCreatedContest");
                }}
                style={{
                  width: wp("90%"),
                  height: hp("7%"),
                  borderRadius: 100,
                  padding: 10,
                  backgroundColor: "#1D9BF0",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: "auto",
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator size={30} color={"#ffffff"} />
                  ) : (
                    "Done"
                  )}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <OfflineContest />
          )}
        </ScrollView>
      </PageContainer>
    </KeyboardAvoidingView>
  );
};

export default Contest;
