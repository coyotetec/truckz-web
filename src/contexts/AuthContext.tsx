import { createContext, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  signedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ signedIn }}>{children}</AuthContext.Provider>
  );
}
