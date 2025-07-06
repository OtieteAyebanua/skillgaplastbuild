import { SessionUser } from "@/services/user";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
enum TriState {
  True = "true",
  False = "false",
  None = "none",
}
interface IWhoWonModal{
    done: ()=> void;
    close: ()=>void;
}
const WhoWonModal = ({done,close}: IWhoWonModal) => {

  const [agreed, setAgreed] = useState(false);
  const [selectedUser, SetSelectedUser] = useState<TriState>(TriState.None);
  const theme = SessionUser?.preferences.darkMode;
  const ModalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalContent: {
      backgroundColor: theme == false ? "#ffffff" : "#141414",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      width: "85%",
    },
    warningIcon: {
      width: 80,
      height: 80,
      marginBottom: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme == false ? "#000000" : "#FFF",
    },
    modalText: {
      color: "#AAA",
      fontSize: 14,
      textAlign: "center",
      marginVertical: 10,
    },
    buttonRow: {
      flexDirection: "row",
      marginTop: 20,
      gap: 20,
    },
    yesButton: {
      borderColor: "#D42620",
      borderWidth: 2,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 100,
      marginRight: 10,
      width: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    yesText: {
      color: "#FF4444",
      fontSize: 16,
      fontWeight: "bold",
    },
    noButton: {
      backgroundColor: "#D42620",
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 100,
      width: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    noText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Modal animationType="fade" transparent={true}>
      <TouchableOpacity onPress={()=>close()} style={ModalStyles.modalContainer}>
        <View style={ModalStyles.modalContent}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Who won?
          </Text>
          <Text
            style={{
              color: "#9ca3af",
              fontSize: 12,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Approved user will take the total stake (Winning prize)
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 8,
              gap: 5,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => SetSelectedUser(TriState.True)}
              style={{
                backgroundColor: selectedUser === "true" ? "#1D9BF033" : "transparent",
                paddingHorizontal: 25,
                paddingVertical: 20,
                borderRadius: 7,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#313335",
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 8,
                  borderRadius: 9999,
                }}
              >
                <Image
                  source={require("../../../../assets/images/profile-bg.png")}
                  style={{ width: 50, height: 50, borderRadius: 9999 }}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={{ color: "#3B82F6", fontSize: 16, fontWeight: "600" }}
              >
                @qubigs
              </Text>
            </TouchableOpacity>
            <Image
              source={require("../../../../assets/images/vs.png")}
              style={{ position: "relative", bottom: 15 }}
            />
            <TouchableOpacity
              onPress={() => SetSelectedUser(TriState.False)}
              style={{
                backgroundColor: selectedUser === "false" ? "#1D9BF033" : "transparent",
                paddingHorizontal: 25,
                paddingVertical: 20,
                borderRadius: 7,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#313335",
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  padding: 8,
                  borderRadius: 9999,
                }}
              >
                <Image
                  source={require("../../../../assets/images/profile-bg.png")}
                  style={{ width: 50, height: 50, borderRadius: 9999 }}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={{ color: "#3B82F6", fontSize: 16, fontWeight: "600" }}
              >
                @qubigs
              </Text>
            </TouchableOpacity>
          </View>

          {/* Done Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#1D9BF0",
              paddingVertical: 10,
              borderRadius: 100,
              alignItems: "center",
              width: "50%",
              marginTop: 20,
            }}
            onPress={() => {
              // handle winner confirmation
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default WhoWonModal;
