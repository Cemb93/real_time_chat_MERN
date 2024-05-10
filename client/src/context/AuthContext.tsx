import { createContext, useCallback, useState } from "react";

export type ContainerProps = {
  children: React.ReactNode
}

export interface IUser {
  name: string
}

export interface IRegister {
  name: string
  email: string
  password: string
}

export type TAuthContext = {
  // user: Record<string, string> // ? SE USA CUANDO ES UN OBJETO QUE CONTIENE LO QUE SEA
  user: IUser
  registerInfo: IRegister
  setRegisterInfo: React.Dispatch<React.SetStateAction<IRegister>>
  updateRegisterInfo: (info: IRegister) => void
}

export const AuthContext = createContext<TAuthContext>({
  user: {
    name: "",
  },
  registerInfo: {
    name: "",
    email: "",
    password: "",
  },
  setRegisterInfo: function() {},
  updateRegisterInfo: function() {},
});

export function AuthContextProvider({ children }: ContainerProps) {
  const [user, ] = useState<IUser>({
    name: "",
  });
  const [registerInfo, setRegisterInfo] = useState<IRegister>({
    name:"",
    email:"",
    password:"",
  });

  const updateRegisterInfo = useCallback(function(info: IRegister): void {
    setRegisterInfo(info);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        setRegisterInfo,
        updateRegisterInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}