import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../hooks/services";
import { ContextProviderProps, ISessionUser, TAuthContext } from "../interface";
import { useNavigate } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

export const AuthContext = createContext<TAuthContext>({
  user: {
    _id: "",
    name: "",
    email: "",
    // password: "",
  },
  registerInfo: {
    _id: "",
    name: "",
    email: "",
    password: "",
  },
  loginInfo: {
    _id: "",
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
});

export function AuthContextProvider({ children }: ContextProviderProps) {
  const navigation = useNavigate();
  const [user, setUser] = useState<ISessionUser>({
    _id: "",
    name:"",
    email:"",
    // password:"",
  });
  const [registerInfo, setRegisterInfo] = useState<ISessionUser>({
    _id: "",
    name:"",
    email:"",
    password:"",
  });
  const [loginInfo, setLoginInfo] = useState<ISessionUser>({
    _id: "",
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
      const data = await response.json();
      // console.log("data:", data)

      localStorage.setItem("userIdWithGoogle", JSON.stringify(data._id));
      localStorage.setItem("userNameWithGoogle", JSON.stringify(data.name));
      setUser(data)
    } catch (error) {
      console.log("Error en getUserWithGoogle por:", error)
    }
  }
  
  useEffect(function() {
    getUserWithGoogle();
  }, []);

  useEffect(function() {
    // const user: ISessionUser = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    // const userId: string = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    // const userId: string = JSON.parse(localStorage.getItem("userId"));
    // const userId: string = JSON.stringify(localStorage.getItem("userId"));// !FORMATO JSON
    const userId: string | null = localStorage.getItem("userId");
    // const userId: string = JSON.parse(JSON.stringify(localStorage.getItem("userId")));
    // console.log("getItem - userId:", userId)
    // const userName: string = JSON.parse(localStorage.getItem("userName"));
    // const userName: string = JSON.parse(JSON.stringify(localStorage.getItem("userName")));
    const userName: string | null = localStorage.getItem("userName");
    const userEmail: string | null = localStorage.getItem("userEmail");
    // setUser(user);
    if (userId && userName && userEmail) {
      setUser({
        _id: JSON.parse(userId),
        name: JSON.parse(userName),
        email: JSON.parse(userEmail),
        // password: "",
      });
    }
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
  
  // const loginUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
  const loginUser = useCallback(async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    e.preventDefault();
    const response: ISessionUser = await postRequest(`${VITE_BACKEND_URL}/login`, loginInfo);
    // localStorage.setItem("user", JSON.stringify(response));


    localStorage.setItem("userId", JSON.stringify(response._id));
    // localStorage.setItem("userId", response._id);


    localStorage.setItem("userName", JSON.stringify(response.name));
    // localStorage.setItem("userName", response.name);
    // console.log("response:", response)
    // setUser(response);
    setUser({
      _id: response._id,
      name: response.name,
      email: response.email,
      // password: response.password,
    });
  }, [loginInfo]);

  const logoutUser = useCallback(function(): void {
    window.open(
      `${VITE_BACKEND_URL}/logout`,
      "_self"
    );
    // localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userIdWithGoogle");
    localStorage.removeItem("userNameWithGoogle");
    navigation("/login")
    setUser({
      _id: "",
      name: "",
      email: "",
    });
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