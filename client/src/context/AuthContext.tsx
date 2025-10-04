import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define the shape of the user object
export interface User {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: "USER" | "ADMIN";
  token?: string;
  refresh_token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For any additional dynamic properties
}

// Define the context type
interface AuthContextType {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  loading: true,
});

// Define props type for provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuth(JSON.parse(storedUser) as User);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync auth state with localStorage
  useEffect(() => {
    if (auth) {
      localStorage.setItem("user", JSON.stringify(auth));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
