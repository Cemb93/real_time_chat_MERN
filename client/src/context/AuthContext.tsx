import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../hooks/services";
import { ContainerProps, ILoginUser, IRegisterUser, TAuthContext } from "../interface";
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
  loginInfo: {
    email: "",
    password: "",
  },
  setRegisterInfo: function() {},
  updateRegisterInfo: function() {},
  updateLoginInfo: function() {},
  registerUser: function() {},
  loginUser: function() {},
  logoutUser: function() {},
});

export function AuthContextProvider({ children }: ContainerProps) {
  const [user, setUser] = useState<IRegisterUser | null>({
    name:"",
    email:"",
    password:"",
  });
  const [registerInfo, setRegisterInfo] = useState<IRegisterUser>({
    name:"",
    email:"",
    password:"",
  });
  const [loginInfo, setLoginInfo] = useState<ILoginUser>({
    email:"",
    password:"",
  });
  // console.log("loginInfo:", loginInfo)

  useEffect(function() {
    const user: IRegisterUser = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    setUser(user);
  }, []);

  const updateRegisterInfo = useCallback(function(info: IRegisterUser): void {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback(function(info: ILoginUser): void {
    setLoginInfo(info);
  }, []);
  
  const registerUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response = await postRequest(`${VITE_BACKEND_URL}/register`, JSON.stringify(registerInfo));
    
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);
  
  const loginUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response = await postRequest(`${VITE_BACKEND_URL}/login`, JSON.stringify(loginInfo));
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);

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
        updateLoginInfo,
        loginInfo,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}