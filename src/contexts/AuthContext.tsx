import { createContext, useState } from 'react';
import { IAuthUser } from '../types/authentication';
import { makeLogin } from '../services/authetication';
import { localStorageKeys } from '../config/localStorageKeys';

interface ILoginPayload {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  signedIn: boolean;
  user: IAuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<IAuthUser | null>>;
  signIn: (payload: ILoginPayload) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAuthToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);

    return !!storedAuthToken;
  });
  const [user, setUser] = useState<IAuthUser | null>(() => {
    const storedUser = localStorage.getItem(localStorageKeys.USER);

    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function signIn({ username, password }: ILoginPayload) {
    const data = await makeLogin({
      username,
      password,
    });

    if (!data) {
      return;
    }

    if (data.type === 'contractor') {
      localStorage.setItem(localStorageKeys.AUTH_TOKEN, data.token);
      localStorage.setItem(localStorageKeys.USER_TYPE, data.type);
      localStorage.setItem(localStorageKeys.USER, JSON.stringify(data.user));

      setSignedIn(true);
      setUser(data.user);
    }
  }

  function signOut() {
    localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
    localStorage.removeItem(localStorageKeys.USER_TYPE);
    localStorage.removeItem(localStorageKeys.USER);

    setSignedIn(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signedIn, user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
