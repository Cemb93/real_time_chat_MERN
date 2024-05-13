import { createContext, useCallback, useEffect, useState } from "react";
import { BACK_END_URL, CHAT, getRequest, postChatRequest, postRequest } from "../hooks/services";
import { ContextProviderProps, IChats, ISessionUser, TChatContext } from "../interface";

export const ChatContext = createContext<TChatContext>({
  userChats: [],
  potentialChats: [],
  createChat: function() {},
});

export function ChatContextProvider({ children, user }: ContextProviderProps) {
  const [userChats, setUserChats] = useState<IChats[]>([]);

  // const [chats, setChats] = useState<IChats[]>([]);
  const [potentialChats, setPtentialChats] = useState<ISessionUser[]>([]);

  useEffect(function() {
    async function getUsers() {
      const response: ISessionUser[] = await getRequest(`${BACK_END_URL}/users`);
      setUserChats(response);
      // console.log("response:", response)
      
      const pChats = response.filter(function(el: ISessionUser) {
        const isChatCreated: {trueOrFalse: boolean} = {trueOrFalse: false};
        console.log("user:", user?._id)
        console.log("el:", el._id)
        
        if (user?._id === el._id) return false;
        
        if (userChats) {
          isChatCreated.trueOrFalse = userChats.some(function(chat: IChats) {
            // console.log("chat:", chat.members)
            if (chat.members) {
              return chat.members[0] === el._id || chat.members[1] === el._id;
            }
          });
        }
        // console.log("isChatCreated:", isChatCreated.trueOrFalse)

        return !isChatCreated.trueOrFalse;
      });
      console.log("pChats:", pChats)

      setPtentialChats(pChats);
    }

    getUsers();
  // }, [userChats]);
  }, []);

  // console.log("user:", user)
  // console.log("user:", JSON.parse(JSON.stringify(user)))
  useEffect(function() {
    async function getUserChats() {
      if (user?._id) {
        const response: IChats[] = await getRequest(`${BACK_END_URL}/${CHAT}/${user._id}`);
        setUserChats(response);
        // console.log("response:", response)
      }
    }
    
    getUserChats();
  }, [user]);
  
  const createChat = useCallback(async function(firstId: string, secondId: string) {
    console.log("firstId:", firstId)
    console.log("secondId:", secondId)
    const response: IChats = await postRequest(`${BACK_END_URL}/${CHAT}`, JSON.parse(JSON.stringify({
      firstId,
      secondId,
    })));
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