import { createContext, useState } from "react";

export type ContainerProps = {
  children: React.ReactNode
}

export type TAuthContext = {
  user: Record<string, string>
  registerInfo: Record<string, string>
  setRegisterInfo: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export const AuthContext = createContext<TAuthContext>({
  // children: {},
  user: {},
  registerInfo: {},
  setRegisterInfo: function() {},
});

export function AuthContextProvider({ children }: ContainerProps) {
  const [user, ] = useState<Record<string, string>>({});
  const [registerInfo, setRegisterInfo] = useState<Record<string, string>>({
    name:"",
    email:"",
    password:"",
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        setRegisterInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}