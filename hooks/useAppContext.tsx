import { IDepositInfo, Transaction } from "@/services/transaction";
import { IUserRecord, SessionUser } from "@/services/user";
import { formatMoney } from "@/utitlity/string";
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaystackProvider } from "react-native-paystack-webview";

type AppContextType = {
  user: IUserRecord | null;
  setUser: Dispatch<SetStateAction<IUserRecord | null>>;
  getUserBalance: () => { left: string; right: string; currency: string };
  depositInfo: IDepositInfo | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function useUserContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within the AppContextProvider"
    );
  }
  return context;
}
const AppContextProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<IUserRecord | null>(SessionUser);
  const [depositInfo, setDepositInfo] = useState<IDepositInfo | null>(null);

  const getBalance = (): { left: string; right: string; currency: string } => {
    const { left, right } = formatMoney(SessionUser?.balance ?? 0);
    const currency = "&#8358;";
    return { left, right, currency };
  };

  useEffect(() => {
    Transaction.getDepositInfo().then((response) => {
      if (response) {
        setDepositInfo(response);
      }
    });
  }, []);

  return depositInfo ? (
    <PaystackProvider
      publicKey={depositInfo?.publicKey ?? ""}
      currency={depositInfo?.currency}
      defaultChannels={depositInfo?.channels}
    >
      <AppContext.Provider
        {...props}
        value={{ user, setUser, getUserBalance: getBalance, depositInfo }}
      />
    </PaystackProvider>
  ) : <></>;
};

export { AppContextProvider, useUserContext };
