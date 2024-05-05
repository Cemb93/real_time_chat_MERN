import { createContext, useEffect, useState } from "react";
import { BACK_END_URL, CHAT, getRequest } from "../hooks/services";

export interface IUsers {
  _id?: string
  name: string,
  email: string,
  password: string,
}

export type ContainerProps = {
  children: React.ReactNode
  // user: IUsers
  user: Record<string, string>
}

export type TChatContext = {
  // user?: IUsers
  // user?: Record<string, string>
  // children?: Record<string, string>
  userChats: Record<string, string>[]
  potentialChats: Record<string, string>[]
}

export const ChatContext = createContext<TChatContext>({
  // user: {
  //   name: "",
  //   email: "",
  //   password: "",
  // },
  // user: {},
  // children: {},
  userChats: [],
  potentialChats: [],
});

export function ChatContextProvider({ children, user }: ContainerProps) {
  console.log("user:", user)
  const [userChats, setUserChats] = useState<Record<string, string>[]>([]);
  const [potentialChats, setPtentialChats] = useState<Record<string, string>[]>([]);

  useEffect(function() {
    async function getUsers() {
      const response = await getRequest(`${BACK_END_URL}/users`);
      setUserChats(response);
      console.log("response:", response)

      const pChats = response.filter(function(el: any) {
        let isChatCreated = false;

        if (user._id === el._id) return false;

        if (userChats) {
          isChatCreated = userChats.some(function(chat: any) {
            return chat.members[0] === el._id || chat.members[1] === el._id;
          });
        }

        return !isChatCreated;
      });

      setPtentialChats(pChats);
    }

    getUsers();
  }, [userChats]);

  useEffect(function() {
    async function getUserChats() {
      if (user._id) {
        const response = await getRequest(`${BACK_END_URL}/${CHAT}/${user._id}`);
        setUserChats(response);
        console.log("response:", response)
      }
    }

    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        // user,
        userChats,
        potentialChats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}