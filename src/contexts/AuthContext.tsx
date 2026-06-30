import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

import { predefinedUsers } from '../data/users';
import type { User } from '../types/User';

interface AuthContextValue {
  currentUser: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('lingoflow_current_user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem('lingoflow_current_user');
    return null;
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredUser);

  const login = (email: string, password: string) => {
    const user = predefinedUsers.find(
      (predefinedUser) =>
        predefinedUser.email.toLowerCase() === email.trim().toLowerCase() &&
        predefinedUser.password === password,
    );

    if (!user) {
      return null;
    }

    setCurrentUser(user);
    localStorage.setItem('lingoflow_current_user', JSON.stringify(user));

    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('lingoflow_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      'useAuth mora da se koristi unutar AuthProvider komponente.',
    );
  }

  return authContext;
};
