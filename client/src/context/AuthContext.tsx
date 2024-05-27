import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../hooks/services";
import { ContextProviderProps, ISessionUser, TAuthContext } from "../interface";
import { useNavigate } from "react-router-dom";
import { removeUserFromLocalStorage } from "../localStorage/removeItems";
const { VITE_BACKEND_URL } = import.meta.env;

export const AuthContext = createContext<TAuthContext>({
  user: {
    _id: "",
    googleId: "",
    name: "",
    email: "",
    // password: "",
  },
  registerInfo: {
    _id: "",
    googleId: "",
    name: "",
    email: "",
    password: "",
  },
  loginInfo: {
    _id: "",
    googleId: "",
    name: "",
    email: "",
    password: "",
  },
  setRegisterInfo: function() {},
  updateRegisterInfo: function() {},
  updateLoginInfo: function() {},
  registerUser: function() {},
  loginUser: function() {},
  logoutUser: function() {},
  getUserWithGoogle: function() {},
});

export function AuthContextProvider({ children }: ContextProviderProps) {
  const navigation = useNavigate();
  const [user, setUser] = useState<ISessionUser>({
    _id: "",
    googleId: "",
    name:"",
    email:"",
    // password:"",
  });
  const [registerInfo, setRegisterInfo] = useState<ISessionUser>({
    _id: "",
    googleId: "",
    name:"",
    email:"",
    password:"",
  });
  const [loginInfo, setLoginInfo] = useState<ISessionUser>({
    _id: "",
    googleId: "",
    name: "",
    email:"",
    password:"",
  });
  
  async function getUserWithGoogle() {
    try {
      const url = `${VITE_BACKEND_URL}/login`;
      const response = await fetch(url, {
        credentials: "include",
      });
      // console.log("response:", response)
      if (response.ok) {
        const data: ISessionUser = await response.json();

        localStorage.setItem("loginWithGoogle", JSON.stringify(data));
        setUser(data)
      }
    } catch (error) {
      console.log("Error en getUserWithGoogle por:", error)
    }
  }
  useEffect(function() {
    getUserWithGoogle();
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
    
    // localStorage.setItem("user", JSON.stringify(response));
    localStorage.setItem("userId", JSON.stringify(response._id));
    // localStorage.setItem("userId", response._id);
    // localStorage.setItem("userName", JSON.stringify(response.name));
    localStorage.setItem("userName", response.name);
    localStorage.setItem("userEmail", response.email);
    // setUser(response);
    setUser({
      _id: response._id,
      name: response.name,
      email: response.email,
      // password: response.password,
    });
  }, [registerInfo]);
  
  const loginUser = useCallback(async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    e.preventDefault();
    const response: ISessionUser = await postRequest(`${VITE_BACKEND_URL}/login`, loginInfo);
    localStorage.setItem("loginWithGoogle", JSON.stringify(response));
    // console.log("response:", response)
    
    navigation("/")
    setUser(response);
  }, [loginInfo]);

  function logOutWithGoogle() {
    window.open(
      `${VITE_BACKEND_URL}/logout`,
      "_self"
    );
  }

  // const logoutUser = useCallback(async function(): void {
  const logoutUser = useCallback(async function(): Promise<void> {
    console.log("user:", user)
    if (user.googleId) {
      console.log("CERRANDO SESSION CON USUARIO DE GOOGLE")
      logOutWithGoogle();
    }
    console.log("CERRANDO SESSION CON USUARIO LOCAR")
    removeUserFromLocalStorage();
    navigation("/login")
    setUser({
      _id: "",
      googleId: "",
      name: "",
      email: "",
    });
    console.log("user:", user)
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
        getUserWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}