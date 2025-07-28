import PageContainer from "@/components/Containers";
import { useUserContext } from "@/hooks/useAppContext";
import { useTheme } from "@/hooks/useThemeContext";
import { Router } from "@/services/router";
import {
  IAccountResolve,
  IBank,
  ITransaction,
  Transaction,
} from "@/services/transaction";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Banks from "../banks";

const Withdraw = () => {
  const { theme } = useTheme();
  const { user } = useUserContext();

  const [showBanks, setShowBanks] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [bank, setBank] = useState<IBank | null>(null);
  const [bankNumber, setBankNumber] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [resolve, setResolve] = useState<IAccountResolve | null>(null);
  const [transaction, setTransaction] = useState<
    ITransaction | "Failed" | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      setBank(null);
      setIsLoading(false);
      setBankNumber("");
      setAmount(0);
      setResolve(null);
      setTransaction(null);
    }, [])
  );

  const onBankSelected = (newBank: IBank) => {
    if (!newBank) return;

    setShowBanks(false);
    // do nothing if we select the same bank
    if (bank && bank.id === newBank.id) return;

    setBank(newBank);
    setBankNumber("");
  };

  const resolveBank = async () => {
    const errors = [];
    if (!bank) errors.push("Please select a bank");
    if (!bankNumber) errors.push("Please enter a bank account number");
    if (amount <= 0 || amount > (user?.balance ?? 0))
      errors.push("Please enter a valid amount");

    if (errors.length > 0) {
      alert(errors[0]);
      return;
    }

    setIsLoading(true);
    try {
      const result = await Transaction.resolveAccount(
        amount,
        bank?.id ?? -1,
        bankNumber
      );

      if (!result) {
        alert("Please verify your account details.");
        return;
      }

      // resolve successful
      setResolve(result);
    } finally {
      setIsLoading(false);
    }
  };

  const initiateWithdrawal = async () => {
    if (!resolve) return;

    setIsLoading(true);
    try {
      const result = await Transaction.initiateWithdrawal(
        resolve.amount,
        resolve.bankId,
        resolve.accountNumber
      );

      if (!result) {
        setTransaction("Failed");
        return;
      }

      // successful
      setTransaction(result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionDone = () => {
    if (transaction === null || transaction === "Failed") {
      setTransaction(null);
      return;
    }

    // route to transactions page
    // TODO : replace this with route to view this transaction
    Router.push("/(tabs)/mainApp/wallet");
  };

  return (
    <PageContainer backgroundColor={theme === false ? "" : "#141414"}>
      {resolve ? (
        <ScrollView>
          <View>
            <Text style={{ color: "#fff", fontWeight: 500 }}>
              {JSON.stringify(resolve)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={initiateWithdrawal}
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
                color: "#FFF",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={30} color={"#ffffff"} />
              ) : (
                "Confirm Payment"
              )}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={transaction !== null}
            transparent
            animationType="slide"
            onRequestClose={handleTransactionDone}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: "100%",
                }}
              >
                <BlurView
                  intensity={80}
                  tint="systemMaterialDark"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableWithoutFeedback>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        {transaction !== "Failed" ? "Congratulations" : "Oops!"}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        {transaction !== "Failed"
                          ? "Your transaction was successful"
                          : "Your transaction was not successful"}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleTransactionDone()}
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
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </BlurView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      ) : (
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
              marginBottom: "10%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme === false ? "#020B12" : "#ffffff",
                paddingTop: 30,
              }}
            >
              Withdraw
            </Text>
          </View>

          <View
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                color: "#A3A3A3",
                marginLeft: 8,
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              Bank Name
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: theme === false ? "#F2F2F7" : "#27292B",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 30,
                paddingHorizontal: 16,
                paddingVertical: 8,
                justifyContent: "space-between",
              }}
              onPress={() => setShowBanks(!showBanks)}
            >
              <Text
                style={{
                  color: "#A3A3A3",
                  marginLeft: 8,
                  fontSize: 14,
                  textTransform: "capitalize",
                }}
              >
                {bank?.name ?? "Select Bank"}
              </Text>

              <Ionicons name="business" size={16} color="#A3A3A3" />
            </TouchableOpacity>
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
              Account Number
            </Text>

            <TextInput
              inputMode="numeric"
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#242628",
                width: "99%",
                height: 40,
                marginLeft: "auto",
                marginRight: "auto",
                color: theme === false ? "#000000" : "#ffffff",
                marginTop: 10,
                padding: 5,
                paddingLeft: 10,
                fontSize: 14,
              }}
              value={`${bankNumber}`}
              onChangeText={(val) => setBankNumber(val)}
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
                color: theme === false ? "#000" : "#fff",
              }}
            >
              Amount
            </Text>

            <TextInput
              inputMode="numeric"
              value={amount.toString()}
              onChangeText={(val) => setAmount(Number(val))}
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
                color: theme === false ? "#000000" : "#ffffff",
                textAlignVertical: "top",
              }}
            />
          </View>

          <TouchableOpacity
            onPress={resolveBank}
            style={{
              width: wp("90%"),
              height: hp("7%"),
              borderRadius: 100,
              padding: 10,
              backgroundColor: "#E7F4FD",
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
                color: "#1D9BF0",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={30} color={"#ffffff"} />
              ) : (
                "Preview"
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal
        visible={showBanks}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBanks(false)}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              height: "100%",
            }}
          >
            <BlurView
              intensity={80}
              tint="systemMaterialDark"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback>
                <Banks
                  onSelected={onBankSelected}
                  close={() => setShowBanks(false)}
                />
              </TouchableWithoutFeedback>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </PageContainer>
  );
};

export default Withdraw;
