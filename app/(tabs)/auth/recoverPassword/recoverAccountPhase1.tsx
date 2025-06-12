import Input from "@/components/ui/Input";
import { emailValidation } from "@/services/formValidation";
import { Router } from "@/services/router";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

interface IRecoverAccountPhase1 {
  getEmail:(email:string)=>void;
  onNext:()=> void;
}
const RecoverAccountPhase1 = ({ getEmail,onNext}: IRecoverAccountPhase1) => {
  const [email,setEmail] = useState("");
  const [proceedLoader,setProceedLoader] = useState(false);

    const simulateApiReq = () => {
    setProceedLoader(true);
    setTimeout(() => {
      setProceedLoader(false);
      getEmail(email);
      onNext()
    }, 2000);
  };

  return <SafeAreaView
          style={{
            paddingTop: 40,
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 16, // px-4
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Router.back()
              }}
              style={{
                paddingLeft: 3,
                marginBottom: 24, // mb-6 → 6 × 4
                width: 30, // w-[30px]
                borderRadius: 9999,
              }}
            >
              <ChevronLeftIcon
                size={25}
                color={ "#292D32"}
              />
            </TouchableOpacity>

            <View>
              <Text
                style={{
                  fontSize: 24, // text-2xl
                  fontWeight: "600", // font-semibold
                  color: "#020B12",
                }}
              >
                Recover Account
              </Text>

              <Text
                style={{
                  color: "#000000" ,
                  marginTop: 30,
                  marginBottom: 50,
                }}
              >
                Enter email address associated with your existing account to
                receive a verification code
              </Text>

              <Input
                type="email"
                placeholder="Enter Email"
                value={(e) => setEmail(e)}
              />

              <TouchableOpacity
                onPress={() => {simulateApiReq()}}
                disabled={!emailValidation(email)}
                style={{
                  width: "99%",
                  height: 56,
                  borderRadius: 100,
                  padding: 10,
                  backgroundColor: emailValidation(email)
                    ? "#1D9BF0"
                    : "#8F8F8F",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 40,
                  alignSelf: "center", // replaces margin: "auto"
                }}
              >
                {proceedLoader ? (
                  <ActivityIndicator size={30} color="#ffffff" />
                ) : (
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                    }}
                  >
                    Proceed
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>;
};

export default RecoverAccountPhase1;
