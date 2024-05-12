import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../hooks/services";
import { ContextProviderProps, ISessionUser, TAuthContext } from "../interface";
import { useNavigate } from "react-router-dom";
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

export function AuthContextProvider({ children }: ContextProviderProps) {
  const navigation = useNavigate();
  const [user, setUser] = useState<ISessionUser>({
    name:"",
    email:"",
    password:"",
  });
  const [registerInfo, setRegisterInfo] = useState<ISessionUser>({
    name:"",
    email:"",
    password:"",
  });
  const [loginInfo, setLoginInfo] = useState<ISessionUser>({
    email:"",
    password:"",
  });
  // console.log("loginInfo:", loginInfo)
  
  useEffect(function() {
    const user: ISessionUser = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    setUser(user);
  }, []);

  const updateRegisterInfo = useCallback(function(info: ISessionUser): void {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback(function(info: ISessionUser): void {
    setLoginInfo(info);
  }, []);
  
  const registerUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response: ISessionUser = await postRequest(`${VITE_BACKEND_URL}/register`, registerInfo);
    
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);
  
  const loginUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response: ISessionUser = await postRequest(`${VITE_BACKEND_URL}/login`, loginInfo);
    localStorage.setItem("user", JSON.stringify(response));
    console.log("response:", response)
    setUser(response);
  }, [loginInfo]);

  const logoutUser = useCallback(function(): void {
    localStorage.removeItem("user");
    navigation("/inicio")
    // setUser(null);
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