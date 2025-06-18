
//import Settings from "@/components/profile/setting";
//import UserDetails from "@/components/profile/userDetails";
//import Utilities from "@/components/profile/utilities";
import PageContainer from "@/components/Containers";
import {
    Image,
    ImageBackground,
    ScrollView,
    useColorScheme,
    View
} from "react-native";
import Settings from "../components/settings";
import UserDetails from "../components/userDetails";
import Utilities from "../components/utilities";


const Profile = () => {
    const theme = useColorScheme();
    return (
        <PageContainer backgroundColor={theme === "light" ? "" : "#141414"}>
            <ScrollView>
                <ImageBackground
                    source={require("../../../assets/images/profile-bg.png")}
                    style={{
                        height: 140,
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 80,
                            left: '50%',
                            transform: [{ translateX: -60 }],
                            zIndex: 10,
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/profile-img.png")}
                            style={{
                                height: 120,
                                width: 120,
                                borderRadius: 60,
                                borderWidth: 2,
                                borderColor: 'white',
                            }}
                        />
                    </View>
                </ImageBackground>

                <View
                    style={{
                        paddingHorizontal: 16,
                        paddingTop: 24,
                        marginTop: 16,
                        zIndex: -10,
                    }}
                >
                    <UserDetails />

                    <Utilities />

                    <Settings />
                </View>
            </ScrollView>
        </PageContainer>
    );
};

export default Profile;
