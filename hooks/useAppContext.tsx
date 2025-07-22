import { IUserRecord, SessionUser } from "@/services/user";
import { formatMoney } from "@/utitlity/string";
import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useState } from "react";

type AppContextType = {
  user: IUserRecord | null;
  setUser: Dispatch<SetStateAction<IUserRecord|null>>;
  getUserBalance: ()=>{ left: string; right: string; currency: string }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function useUserContext(): AppContextType {
    const context = useContext(AppContext);
    if(!context){
        throw new Error("useUserContext must be used within the AppContextProvider")
    }
    return context;
}
const AppContextProvider = (props:{children:ReactNode}): ReactElement => {
    const [user,setUser] = useState<IUserRecord | null>(SessionUser);
    const getBalance = (): { left: string; right: string; currency: string } => {
        const { left, right } = formatMoney(SessionUser?.balance ?? 0);
        const currency = "&#8358;";
        return { left, right, currency };
      };
    return <AppContext.Provider {...props} value={{user,setUser,getUserBalance:getBalance}}/>
};

export { AppContextProvider, useUserContext };

