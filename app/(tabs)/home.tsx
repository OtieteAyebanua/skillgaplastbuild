import { Router } from "@/services/router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home =()=>{
    Router.clearHistory();
    return <SafeAreaView>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"red"}}>This is Home</Text>
    </View></SafeAreaView>
}

export default Home;