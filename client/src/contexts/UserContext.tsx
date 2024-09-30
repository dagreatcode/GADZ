// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  password: string;
  description: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  userId: string | null;
  setUserId: (id: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
