"use client"
import { useState, useEffect, createContext, useContext } from "react";
import { useWeb3 } from "./Web3Context";

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
};

// Create context with default values
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: null,
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around components that need access to the context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Get web3 and contract instances from Web3Context
  const { web3, isAccountChanged } = useWeb3();

  // State to hold the user data
  const [user, setUser] = useState<UserData>();

  // Fetch user data when web3 instance is available
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching user data");

      if (!web3) return;
      setUser({ loading: true });

      const account = await web3.eth.getAccounts();
      console.log(account)
      if (account.length > 0) {
        setUser({ publicAddress: account[0] });
      } else {
        setUser({ loading: false });
      }
    };

    fetchData();
  }, [web3, isAccountChanged]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};