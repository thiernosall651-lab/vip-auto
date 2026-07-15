import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Client-side PIN gate. This protects the admin UI in the browser; it is NOT a
// substitute for server-side auth. When a backend (Supabase) is added, replace
// this provider with a real session — the rest of the admin UI stays unchanged.
const PIN_KEY = "vip-auto-admin-pin";
const SESSION_KEY = "vip-auto-admin-session";
const DEFAULT_PIN = "2020";

function getStoredPin(): string {
  if (typeof window === "undefined") {
    return DEFAULT_PIN;
  }
  return window.localStorage.getItem(PIN_KEY) ?? DEFAULT_PIN;
}

type AdminAuthValue = {
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  changePin: (currentPin: string, nextPin: string) => boolean;
};

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) === "1",
  );

  const login = useCallback((pin: string): boolean => {
    if (pin === getStoredPin()) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  const changePin = useCallback((currentPin: string, nextPin: string): boolean => {
    if (currentPin !== getStoredPin() || !/^\d{4}$/.test(nextPin)) {
      return false;
    }
    window.localStorage.setItem(PIN_KEY, nextPin);
    return true;
  }, []);

  const value = useMemo<AdminAuthValue>(
    () => ({ isAuthenticated, login, logout, changePin }),
    [changePin, isAuthenticated, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return context;
}
