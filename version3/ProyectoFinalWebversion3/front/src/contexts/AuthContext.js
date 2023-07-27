// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userApellido, setUserApellido] = useState('');

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail,userName,setUserName,userApellido,setUserApellido }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

