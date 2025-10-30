import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  role: string;
  setRole: (role: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userId: number | null;
  setUserId: (id: number | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: "guest",
  setRole: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userId: null,
  setUserId: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string>(
    () => localStorage.getItem("role") || "guest"
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem("userId");
    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem("userId", String(userId));
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};