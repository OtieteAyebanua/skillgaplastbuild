import { Router } from "@/services/router";
import { SessionUser } from "@/services/user";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
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

interface ICategories {
  id: number;
  name: string;
  color: string;
}

const OfflineContest = () => {
  const theme = SessionUser?.preferences.darkMode;
  const [isGrouped, setIsGrouped] = useState(false);
  const [characterValue, setCharacterValue] = useState("");
  const maxChars = 50;
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <>
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
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
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
              }}
            >
              Group Contest
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,
                color: "#8F8F8F",
                fontWeight: "500",
              }}
            >
              This will enable you to invite other users to join your contest
            </Text>
          </View>

          <Switch
            value={isGrouped}
            onValueChange={() => {
              setIsGrouped((prev) => !prev);
            }}
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
          />
        </View>

        {/* Divider */}
        <View
          style={{
            width: 306,
            height: 0,
            flexGrow: 0,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
            borderTopWidth: 1,
            borderColor: "#F7F7F7",
            paddingBottom: 10,
          }}
        />

        {isGrouped ? (
          <>
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
              Opponent's skillgap tag
            </Text>
            <TextInput
              placeholder="e.g @skillgap"
              placeholderTextColor={theme == false ? "#000000" : "#ffffff"}
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
                flexGrow: 0,
                marginLeft: "auto",
                marginRight: "auto",
                color: theme == false ? "#000" : "#fff",
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
              <Text style={{ color: "#8F8F8F", fontSize: 12 }}>@skillgap</Text>
            </View>
          </View>
        )}

        {isGrouped && (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#3b82f6",
              borderRadius: 9999,
              paddingVertical: 8,
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Feather name="plus" size={15} color="#3b82f6" />
            <Text
              style={{
                color: "#3b82f6",
                fontSize: 14,
                fontWeight: "500",
                marginLeft: 8,
              }}
            >
              Add opponent
            </Text>
          </TouchableOpacity>
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
          All result from your selections ranging from main to sub categories
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
              onPress={() => {
                setSelectedCategories((prev) => [...prev, item]);
                setCategories((prev) =>
                  prev.filter((cat) => cat.id !== item.id)
                );
              }}
              style={{
                width: 84,
                height: 32,
                borderStyle: "dashed",
                borderColor: item.color,
                borderWidth: 1,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme == false ? "#fff" : "#27292B",
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

        {/* Divider */}
        <View
          style={{
            width: "100%",
            height:2,
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
              onPress={() => {
                setCategories((prev) => [...prev, item]);
                setSelectedCategories((prev) =>
                  prev.filter((cat) => cat.id !== item.id)
                );
              }}
              style={{
                width: 84,
                height: 32,
                borderStyle: "dashed",
                borderColor: "#1D9BF0",
                borderWidth: 1,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
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
          marginBottom: 10,
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
          placeholderTextColor={theme == false ? "#000000" : "#ffffff"}
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
          placeholder="Write terms here..."
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
            textAlignVertical: "top", // ensures top alignment in multiline
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
              width: 40,
              marginTop: 5,
              color: "#8F8F8F",
              textAlign: "right",
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
  );
};

export default OfflineContest;
