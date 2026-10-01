import { createContext, useContext } from "react";
import { useUser } from "../hooks/queries/useUser";
import type { User } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useUser();

  const value: AuthContextType = {
    user: data ?? null,
    isAuthenticated: !!data,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve essere utilizzato all'interno di AuthProvider",
    );
  }

  return context;
};
