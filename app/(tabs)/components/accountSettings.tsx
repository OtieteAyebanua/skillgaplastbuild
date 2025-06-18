import PageContainer from "@/components/Containers";
import Input from "@/components/ui/Input";
import { isValidUrl } from "@/services/formValidation";
import { Router } from "@/services/router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
    widthPercentageToDP as wp
} from "react-native-responsive-screen";


const AccountSettings = () => {

    const theme = useColorScheme()
    const [getProfileImg, setGetProfileImg] = useState<any>();
    const [getCoverImg, setGetCoverImg] = useState<any>();
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [fullName, setFullName] = useState("");
    const [tag, setTag] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [tikTok, setTikTok] = useState("");
    const [youtube, setYoutube] = useState("");
    const [bio, setBio] = useState("");
    const [canChangeTag, setCanChangeTag] = useState(false);
    const [error, setError] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false);


    const NoStyles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 100,
        borderWidth:1,
        borderColor: theme === "light" ? "#D0D5DD" : "#fff",
        width: "100%",
        alignSelf: "center"
    },
    text: {
        color: "#1D9BF0",
        fontSize: 14,
    },
});

    const pickCoverImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setGetCoverImg(result.assets[0]);
            setCoverImageUrl(result.assets[0].uri);
        }
    };
    const pickProfileImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setGetProfileImg(result.assets[0]);
            setProfileImageUrl(result.assets[0].uri);
        }
    };

    const simulateApiReq = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Router.back()
        }, 2000);
    };
    return <PageContainer
        backgroundColor={theme === "light" ? "#FAFAFA" : "#141414"}
    >
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginTop: 40

            }}
        >
            <View style={{ position: "absolute", top: 0, left: 12 }}>
                <TouchableOpacity
                    onPress={() => {
                        Router.push("/");
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
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme === "light" ? "#020B12" : "#FFFFFF",
                }}
            >
                Account Settings
            </Text>
        </View>
        <ScrollView>
            <ImageBackground
                source={coverImageUrl
                    ? { uri: coverImageUrl }
                    :
                    require("../../../assets/images/profile-bg.png")
                }
                style={{ height: 140, width: "100%" }}
            >
                <View
                    style={{
                        position: "absolute",
                        marginBottom: 24,
                        marginRight: 24,
                        overflow: "hidden",
                        backgroundColor: "#E5E7EB",
                        borderRadius: 9999,
                        top: 80,
                        left: "50%",
                        transform: [{ translateX: -60 }],
                        zIndex: 10,
                        height: 120,
                        width: 120,
                    }}
                >

                    <Image
                        source={profileImageUrl
                            ? { uri: profileImageUrl }
                            : require("../../../assets/images/no-image.png")}
                        style={{ width: "100%", height: "100%" }}
                    />

                </View>
                <TouchableOpacity
                    onPress={() => pickProfileImage()}
                    style={{ position: "relative", top: 160, left: "60%", zIndex: 10, width: 15 }}
                >
                    <Image source={require("../../../assets/icons/edit.png")} />
                </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity
                style={{ position: "absolute", top: 80, left: "65%" }}
                onPress={() => pickCoverImage()}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                        borderRadius: 10,
                        elevation: 2,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        gap: 5,
                        width: 107,
                    }}
                >
                    <Image source={require("../../../assets/icons/edit.png")} />
                    <Text style={{ fontSize: 12 }}>Change cover</Text>
                </View>
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 16, paddingBottom: 16, marginTop: 64 }}>
                {/* Form fields are unchanged as they're using custom components */}
            </View>
            <View style={{ paddingHorizontal: 16, paddingBottom: 16,}}>
                <View style={{ width: '100%', marginBottom: 16 }}>

                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                        }}
                    >Full Name</Text>
                    <Input
                        type="text"
                        placeholder={""}
                        value={(e) => setFullName(e)}
                    />
                </View>

                <View style={{ width: '100%', marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                        }}
                    >Bio</Text>
                    <Input
                        type="text"
                        placeholder={""}
                        value={(e) => setBio(e)}
                    />
                </View>

                <View style={{ width: '100%', marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                            paddingBottom:10
                        }}
                    >Skill Gap Tag</Text>
                    {canChangeTag ? (
                        <View>
                            <Input
                                type="text"
                                placeholder={""}
                                value={(e) => setTag(e)}
                            />
                            {error ? null : (
                                <Text style={{ color: "#FF4444", fontSize: 10, marginTop: 5 }}>
                                    This Skill gap tag was incorrect or does not exist on our database
                                </Text>
                            )}
                        </View>
                    ) : (
                        <View style={NoStyles.container}>
                            <Text style={NoStyles.text}>@{"placeHolder"}</Text>
                        </View>
                    )}

                    {canChangeTag ? (
                        <View style={styles.container}>
                            <MaterialIcons
                                name="error-outline"
                                size={20}
                                color="#1D9BF0"
                                style={styles.icon}
                            />
                            <Text style={{ color: "#1D9BF0", fontSize: 9 }}>
                                You are Eligible to change your skillGap tag
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <MaterialIcons
                                name="error-outline"
                                size={20}
                                color="#FF5733"
                                style={styles.icon}
                            />
                            <Text style={styles.text}>
                                Your skill gap tag can only be changed twice in 12 months (a year)
                            </Text>
                        </View>
                    )}
                </View>

                <View style={{ width: '100%', marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                        }}
                    >Twitter (x)</Text>
                    <Input
                        type="text"
                        placeholder={""}
                        value={(e) => {
                            setTwitter(e);
                        }}
                    />
                    <Text style={{ color: "#FB5631" }}>
                        {isValidUrl(twitter) ? null : "Invalid URl"}
                    </Text>
                </View>

                <View style={{ width: '100%', marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                        }}
                    >Tiktok</Text>
                    <Input
                        type="text"
                        placeholder={""}
                        value={(e) => {
                            setTikTok(e);
                        }}
                    />
                    <Text style={{ color: "#FB5631" }}>
                        {isValidUrl(tikTok) ? null : "Invalid URl"}
                    </Text>
                </View>

                <View style={{ width: '100%', marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                        }}
                    >Facebook</Text>
                    <Input
                        type="text"
                        placeholder={""}
                        value={(e) => {
                            setFacebook(e);
                        }}
                    />
                    <Text style={{ color: "#FB5631" }}>
                        {isValidUrl(facebook) ? null : "Invalid URl"}
                    </Text>
                </View>

                <View style={{ width: '100%', marginBottom: 16 }}>
                    <Text
                        style={{
                            fontSize: 14, // text-2xl
                            fontWeight: "400", // font-semibold
                            color: theme === "light" ? "#020B12" : "#fff",
                        }}
                    >Youtube</Text>
                    <Input
                        type="text"
                        placeholder={""}
                        value={(e) => {
                            setYoutube(e);
                        }}
                    />
                    <Text style={{ color: "#FB5631" }}>
                        {isValidUrl(youtube) ? null : "Invalid URl"}
                    </Text>
                </View>
            </View>

        </ScrollView>
        <View style={{ width: "100%", marginBottom: 16 }}>
            <TouchableOpacity
                onPress={() => { simulateApiReq()}}
                style={{
                    width: wp("90%"),
                    height: 56,
                    borderRadius: 100,
                    padding: 10,
                    backgroundColor: "#1D9BF0",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: "auto",
                }}
            >
                <Text style={{ color: "#ffffff", fontSize: 14 }}>
                    {isLoading ? (
                        <ActivityIndicator size={30} color={"#ffffff"} />
                    ) : (
                        "Update"
                    )}
                </Text>
            </TouchableOpacity>
        </View>
    </PageContainer>

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#27292B",
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: "#FB5631",
        fontSize: 9,
    },
});

const NoStyles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 100,
        borderWidth:1,
        borderColor: "#333",
        width: "100%",
        alignSelf: "center"
    },
    text: {
        color: "#1D9BF0",
        fontSize: 14,
    },
});



export default AccountSettings;