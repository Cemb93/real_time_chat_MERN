import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../hooks/services";
import { ContextProviderProps, ISessionUser, TAuthContext } from "../interface";
import { useNavigate } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

export const AuthContext = createContext<TAuthContext>({
  user: {
    id: "",
    name: "",
    email: "",
    // password: "",
  },
  registerInfo: {
    id: "",
    name: "",
    email: "",
    password: "",
  },
  loginInfo: {
    id: "",
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
    id: "",
    name:"",
    email:"",
    // password:"",
  });
  const [registerInfo, setRegisterInfo] = useState<ISessionUser>({
    id: "",
    name:"",
    email:"",
    password:"",
  });
  const [loginInfo, setLoginInfo] = useState<ISessionUser>({
    id: "",
    name: "",
    email:"",
    password:"",
  });
  
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
    // setUser(user);
    if (userId && userName) {
      setUser({
        id: JSON.parse(userId),
        name: JSON.parse(userName),
        email: "",
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
    localStorage.setItem("userId", JSON.stringify(response.id));
    // localStorage.setItem("userId", response.id);
    // localStorage.setItem("userName", JSON.stringify(response.name));
    localStorage.setItem("userName", response.name);
    // setUser(response);
    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
      // password: response.password,
    });
  }, [registerInfo]);
  
  const loginUser = useCallback(async function(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const response: ISessionUser = await postRequest(`${VITE_BACKEND_URL}/login`, loginInfo);
    // localStorage.setItem("user", JSON.stringify(response));


    localStorage.setItem("userId", JSON.stringify(response.id));
    // localStorage.setItem("userId", response.id);


    localStorage.setItem("userName", JSON.stringify(response.name));
    // localStorage.setItem("userName", response.name);
    console.log("response:", response)
    // setUser(response);
    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
      // password: response.password,
    });
  }, [loginInfo]);

  const logoutUser = useCallback(function(): void {
    // localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigation("/login")
    setUser({
      id: "",
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