import { createContext, useEffect, useState } from "react";
import { BACK_END_URL, CHAT, getRequest } from "../hooks/services";
import { ContextProviderProps, IChats, ISessionUser, IUserChat, TChatContext } from "../interface";

export const ChatContext = createContext<TChatContext>({
  userChats: [],
  // potentialChats: [],
});

export function ChatContextProvider({ children, user }: ContextProviderProps) {
  const [userChats, setUserChats] = useState<IUserChat[]>([]);

  // const [chats, setChats] = useState<IChats[]>([]);
  // const [potentialChats, setPtentialChats] = useState<ISessionUser[]>([]);

  // useEffect(function() {
  //   async function getUsers() {
  //     const response: ISessionUser[] = await getRequest(`${BACK_END_URL}/users`);
  //     setUserChats(response);
  //     // console.log("response:", response)
      
  //     const pChats = response.filter(function(el: ISessionUser) {
  //       const isChatCreated: {trueOrFalse: boolean} = {trueOrFalse: false};
        
  //       if (user?._id === el._id) return false;
        
  //       if (userChats) {
  //         isChatCreated.trueOrFalse = userChats.some(function(chat: IChats) {
  //           // console.log("chat:", chat.members)
  //           if (chat.members) {
  //             return chat.members[0] === el._id || chat.members[1] === el._id;
  //           }
  //         });
  //         console.log("isChatCreated:", isChatCreated.trueOrFalse)
  //       }

  //       return !isChatCreated.trueOrFalse;
  //     });

  //     setPtentialChats(pChats);
  //   }

  //   getUsers();
  // // }, [userChats]);
  // }, []);

  // console.log("user:", JSON.parse(JSON.stringify(user)))
  useEffect(function() {
    async function getUserChats() {
      if (user?._id) {
        const response: IUserChat[] = await getRequest(`${BACK_END_URL}/${CHAT}/${user._id}`);
        setUserChats(response);
        console.log("response:", response)
      }
      const response: IUserChat[] = await getRequest(`${BACK_END_URL}/${CHAT}/${!user._id ? "664061bdd4e046aaa5ec7929" : user._id}`);
      setUserChats(response);
      console.log("response:", response)
    }

    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        // potentialChats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}