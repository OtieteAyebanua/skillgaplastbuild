import AsyncStorage from "@react-native-async-storage/async-storage";
const tokenKey: string = "skillGap_tokenKey";

export const setTokenToStorage = async (value: any) => {
  try {
    await AsyncStorage.setItem(tokenKey, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};
export const getTokenFromStorage = async () => {
  const token: any = await AsyncStorage.getItem(tokenKey);
  if (token !== null) {
    return JSON.parse(token);
  }
  return null;
};
export const clearTokenFromStorage = async () => {
  await AsyncStorage.removeItem(tokenKey);
  return true;
};

export const setFirstTimeInstallation = async () => {
  const value = "No";
  try {
    await AsyncStorage.setItem("firstTime", JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getFirstTimeInstallationDetail =  async ()=>{
  const token: string = await AsyncStorage.getItem("firstTime");
  if (token !== null) {
    return JSON.parse(token);
  }
  return null;
}