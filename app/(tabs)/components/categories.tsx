import { Contest, IContestCategory } from "@/services/contest";
import { Media } from "@/services/media";
import { SessionUser } from "@/services/user";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import NetworkImage from "./networkImage";

interface ICategories {
  close: () => void;
  onSelected: (category: IContestCategory | null) => void;
}

const Categories = ({ close, onSelected }: ICategories) => {
  const theme = SessionUser?.preferences.darkMode;

  const [stage, setStage] = useState<
    "Categories" | "Sub Categories" | "Filter"
  >("Categories");

  const [categories, setCategories] = useState<IContestCategory[]>([]);
  const [subCategories, setSubCategories] = useState<IContestCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    IContestCategory[]
  >([]);

  useEffect(() => {
    Contest.getCategories(null).then((data) => {
      setCategories(data ?? []);
    });
  }, []);

  const handleClose = () => {
    if (stage === "Categories") close();
    else setStage("Categories");
  };

  const handleCategorySelected = (category: IContestCategory) => {
    const isMainCategory = category.parentId === null;

    const categoryMap = [...selectedCategories];

    if (isMainCategory) {
      // reset category map
      categoryMap.length = 0;
    }

    // add selected category to list
    categoryMap.push(category);

    setSelectedCategories(categoryMap);

    if (category.hasChildren) {
      setSubCategories([]);
      Contest.getCategories(category.id).then((data) => {
        setSubCategories(data ?? []);
      });
      setStage("Sub Categories");
    } else {
      setStage("Filter");
    }
  };

  const handleApply = () => {
    // simply close modal if something goes wrong
    if (selectedCategories.length === 0) close();

    const selectedCategory = selectedCategories.pop();
    onSelected(selectedCategory ?? null);
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: !theme ? "#ffffff" : "#141414",
      }}
    >
      <View
        style={{
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: "center",
          backgroundColor: !theme ? "#F8F8F8" : "#1D1F20",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "60%",
            justifyContent: "space-between",
          }}
        >
          <View className="">
            <TouchableOpacity
              onPress={handleClose}
              className={` w-[0px] rounded-full`}
              style={{
                paddingLeft: 10,
              }}
            >
              <ChevronLeftIcon
                size={25}
                color={!theme ? "#292D32" : "#ffffff"}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: `${!theme ? "#000000" : "#ffffff"}`,
            }}
          >
            {stage}
          </Text>
        </View>
      </View>

      {stage === "Filter" ? (
        <>
          <Text
            style={{
              color: "#8F8F8F",
              fontWeight: 600,
              paddingLeft: 12,
              paddingTop: 5,
              fontSize: 18,
            }}
          >
            Selected Categories
          </Text>
          <Text
            style={{
              color: "#8F8F8F",
              fontWeight: 400,
              paddingLeft: 12,
              paddingTop: 5,
              fontSize: 10,
            }}
          >
            All result from your selections ranging from main to sub categories
          </Text>
          <Text
            style={{
              color: "#8F8F8F",
              fontWeight: 400,
              paddingLeft: 12,
              paddingTop: 5,
              paddingBottom: 16,
              fontSize: 10,
            }}
          >
            {selectedCategories.reduce((prev, curr, index) => {
              return (
                prev +
                curr.name +
                (index < selectedCategories.length - 1 ? ". " : "")
              );
            }, "")}
          </Text>
          <TouchableOpacity
            onPress={handleApply}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#3B82F6",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </>
      ) : // Sub Categories Section
      stage === "Sub Categories" ? (
        <>
          <Text
            style={{
              color: "#8F8F8F",
              fontWeight: 400,
              paddingLeft: 12,
              paddingTop: 5,
              fontSize: 10,
            }}
          >
            {selectedCategories.reduce((prev, curr, index) => {
              return (
                prev +
                curr.name +
                (index < selectedCategories.length - 1 ? ". " : "")
              );
            }, "")}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 12, paddingBottom: 50 }}
          >
            {subCategories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  borderRadius: 12,
                  marginBottom: 12,
                }}
                onPress={() => handleCategorySelected(item)}
              >
                <NetworkImage
                  loadingUri={require("../../../assets/images/icon.png")}
                  uri={Media.GetCategoryImageUris(item.id)?.large}
                  style={{
                    width: 100,
                    height: 65,
                    borderRadius: 8, // rounded-md
                    marginRight: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16, // text-base
                      fontWeight: "600", // font-semibold
                      color: !theme ? "#000000" : "#ffffff",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    width: 31,
                    height: 63,
                    alignItems: "center",
                    justifyContent: "center",
                    display: item.hasChildren ? "contents" : "none",
                  }}
                >
                  <ChevronRightIcon width={15} color={"#fff"} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0, paddingTop: 10 }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleCategorySelected(item);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 12,
                padding: 12,
                marginBottom: 5,
              }}
            >
              <NetworkImage
                loadingUri={require("../../../assets/images/icon.png")}
                uri={Media.GetCategoryImageUris(item.id)?.large}
                style={{
                  width: 100,
                  height: 65,
                  borderRadius: 8, // rounded-md
                  marginRight: 12,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16, // text-base
                    fontWeight: "600", // font-semibold
                    color: !theme ? "#000000" : "#ffffff",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    width: 185,
                    height: 30,
                    fontSize: 10,
                    color: "#8F8F8F",
                  }}
                >
                  {item.description}
                </Text>
              </View>

              <View
                style={{
                  width: 31,
                  height: 63,
                  backgroundColor: "#7900FB",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRightIcon color={"#ffffff"} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;
