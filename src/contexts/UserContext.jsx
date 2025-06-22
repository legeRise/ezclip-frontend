import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem('user_info');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('user_info', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('user_info');
    }
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
