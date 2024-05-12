import { createContext, useCallback, useEffect, useState } from "react";
import { BACK_END_URL, CHAT, getRequest, postRequest } from "../hooks/services";
import { ContextProviderProps, IChats, ISessionUser, IUserChat, TChatContext } from "../interface";

export const ChatContext = createContext<TChatContext>({
  userChats: [],
  potentialChats: [],
  createChat: function() {},
});

export function ChatContextProvider({ children, user }: ContextProviderProps) {
  const [userChats, setUserChats] = useState<IUserChat[]>([]);

  const [chats, setChats] = useState<IChats[]>([]);
  const [potentialChats, setPtentialChats] = useState<ISessionUser[]>([]);

  useEffect(function() {
    async function getUsers() {
      const response: ISessionUser[] = await getRequest(`${BACK_END_URL}/users`);
      setUserChats(response);
      // console.log("response:", response)
      
      const pChats = response.filter(function(el: ISessionUser) {
        const isChatCreated: {trueOrFalse: boolean} = {trueOrFalse: false};
        
        if (user?.id === el.id) return false;
        
        if (userChats) {
          isChatCreated.trueOrFalse = userChats.some(function(chat: IChats) {
            // console.log("chat:", chat.members)
            if (chat.members) {
              return chat.members[0] === el.id || chat.members[1] === el.id;
            }
          });
          // console.log("isChatCreated:", isChatCreated.trueOrFalse)
        }

        return !isChatCreated.trueOrFalse;
      });

      setPtentialChats(pChats);
    }

    getUsers();
  // }, [userChats]);
  }, []);

  // console.log("user:", user)
  // console.log("user:", JSON.parse(JSON.stringify(user)))
  useEffect(function() {
    async function getUserChats() {
      if (user?.id) {
        const response: IUserChat[] = await getRequest(`${BACK_END_URL}/${CHAT}/${user.id}`);
        setUserChats(response);
        // console.log("response:", response)
      }
    }
    
    getUserChats();
  }, [user]);
  
  const createChat = useCallback(async function(firstId: string, secondId: string) {
    const response: IUserChat = await postRequest(`${BACK_END_URL}/${CHAT}`, JSON.stringify({
      firstId,
      secondId,
    }));
    setUserChats(function(prec) {
      return [...prec, response];
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        potentialChats,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}