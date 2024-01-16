"use client"
import { useState, useEffect, createContext, useContext } from "react";
import { magic } from "../lib/magic"

// Define custom user data type
interface UserData {
  publicAddress?: string;
  phoneNumber?: string;
  email?: string;
  issuer?: string;
  loading?: boolean;
  walletType?: string;
  isMfaEnabled?: boolean;
  recoveryFactors?: any;
}

// Define user context type
type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>> | null;
  isLoggedIn: boolean;
};

// Create context with default values
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: null,
  isLoggedIn: false,
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to the context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // State to hold the user data
  const [user, setUser] = useState<UserData>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // Fetch user data when web3 instance is available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = await magic?.user?.isLoggedIn();

        if (isLoggedIn) {
          setIsLoggedIn(isLoggedIn)
          console.log("1: Before calling isLoggedIn")
          let userMetadata = await magic?.user.getMetadata();
          console.log("2: After calling isLoggedIn")
          setUser(userMetadata);
        }
      } catch (err) {
        console.log("User Context Error: ", err)
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};