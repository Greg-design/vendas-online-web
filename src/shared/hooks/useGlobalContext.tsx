import { createContext, useContext, useEffect, useState } from "react";
import { getAuthorizationToken, setAuthorizationToken } from "../functions/connection/auth";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
  description?: string;
}

interface GlobalData {
  accessToken?: string;
  notification?: NotificationProps;
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode;
}

// aqui é o Provider
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return <GlobalContext.Provider value={{ globalData, setGlobalData }}>{children}</GlobalContext.Provider>;
};
//coloco esse GlobalProvider lá no arquivo main.tsx

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  // se tiver token ele traz na pagina pra mim
  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const setAccessToken = (accessToken: string) => {
    setAuthorizationToken(accessToken);
    setGlobalData({
      ...globalData,
      accessToken,
    });
  };

  const setNotification = (message: string, type: NotificationType, description?: string) => {
    setGlobalData({
      ...globalData,
      notification: {
        message,
        type,
        description,
      },
    });
  };

  return {
    notification: globalData.notification,
    accessToken: globalData.accessToken,
    setAccessToken,
    setNotification,
  };
};
