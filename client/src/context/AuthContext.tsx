import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../hooks/services";
import { ContainerProps, IRegister, IUser, TAuthContext } from "../interface";
const { VITE_BACKEND_URL } = import.meta.env;

export const AuthContext = createContext<TAuthContext>({
  user: {
    name: "",
    email: "",
    password: "",
  },
  registerInfo: {
    name: "",
    email: "",
    password: "",
  },
  setRegisterInfo: function() {},
  updateRegisterInfo: function() {},
  registerUser: function() {},
  logoutUser: function() {},
});

export function AuthContextProvider({ children }: ContainerProps) {
  const [user, setUser] = useState<IUser | null>({
    name:"",
    email:"",
    password:"",
  });
  const [registerInfo, setRegisterInfo] = useState<IRegister>({
    name:"",
    email:"",
    password:"",
  });

  useEffect(function() {
    // const user = localStorage.getItem("user");
    const user: IUser = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    setUser(user);
  }, []);

  const updateRegisterInfo = useCallback(function(info: IRegister): void {
    setRegisterInfo(info);
  }, []);
  
  const registerUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response = await postRequest(`${VITE_BACKEND_URL}/register`, JSON.stringify(registerInfo));
    
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  const logoutUser = useCallback(function(): void {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        setRegisterInfo,
        updateRegisterInfo,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}