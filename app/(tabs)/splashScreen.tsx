import { clearTokenFromStorage } from '@/services/storageHelpers';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

export default function SplashScreen() {
  clearTokenFromStorage();
  return (
    <SafeAreaView className="flex-1 bg-[#032B69] justify-center items-center">
      {/* Optional: customize the status bar */}

      <View style={{backgroundColor:"#0E80CE",height:"100%",justifyContent:"center",alignItems:"center"}} className="border border-white border-opacity-20 p-6 rounded-lg">
        <Image
          source={require('../../assets/images/splash-icon.png')}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text style={{fontSize:16,fontWeight:"600",color:"#fff",position:"absolute",bottom:30}}>.....Bank on your skill</Text>
      </View>
    </SafeAreaView>
  );
}