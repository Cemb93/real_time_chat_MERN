import { createContext, useCallback, useEffect, useState } from "react";
import { BACK_END_URL, CHAT, getRequest, postChatRequest, postRequest } from "../hooks/services";
import { ContextProviderProps, IChats, IMessages, IMessagesInTimeReal, IOnlineUser, ISessionUser, TChatContext } from "../interface";
import { Socket, io } from "socket.io-client";

export const ChatContext = createContext<TChatContext>({
  userChats: [],
  potentialChats: [],
  messages: [],
  currentChats: {},
  createChat: function() {},
  updateCurrentChat: function() {},
  sendTextMessage: function() {},
  onlineUsers: [],
});

export function ChatContextProvider({ children, user }: ContextProviderProps) {
  const [userChats, setUserChats] = useState<IChats[]>([]);

  // const [chats, setChats] = useState<IChats[]>([]);
  const [potentialChats, setPtentialChats] = useState<ISessionUser[]>([]);
  const [currentChats, setCurrentChats] = useState<IChats>({});
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [newMessage, setNewMessage] = useState<IMessages>();
  const [socket, setSocket] = useState<Socket>();
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUser[]>([]);
  // console.log("socket:", socket)
  // console.log("onlineUsers:", onlineUsers)
  
  // * SE INICIA SOCKET - IO
  useEffect(function() {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    
    return function() {
      newSocket.disconnect();
    }
  }, [user]);

  // ? ADD ONLINE USER
  useEffect(function() {
    if (!socket) return;
    // console.log('user?._id:', user?._id);
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", function(online: IOnlineUser[]) {
      console.log("online:", online)
      setOnlineUsers(online);
    });

    return function() {
      socket.off("getOnlineUsers");
    }
  }, [socket]);

  // ! SEND MESSAGE
  useEffect(function() {
    if (!socket) return;
    const recipientId = currentChats.members && currentChats.members.find(function(_id: string) {
      return _id !== user?._id;
    });
    console.log("recipientId:", recipientId)
    socket.emit("sendMessage", {
      ...newMessage,
      recipientId,
    });
  }, [newMessage]);

  // * RECEIVE MESSAGE
  useEffect(function() {
    if (!socket) return;
    socket.on("getMessage", function(ms: IMessagesInTimeReal) {
      if (currentChats._id !== ms.chatId) return;
      setMessages(function(messages) {
        return [...messages, ms];
      });
    });

    return function() {
      socket.off("getMessage");
    }
  }, [socket, currentChats]);

  useEffect(function() {
    async function getUsers() {
      const response: ISessionUser[] = await getRequest(`${BACK_END_URL}/users`);
      setUserChats(response);
      // console.log("response:", response)
      
      const pChats = response.filter(function(el: ISessionUser) {
        const isChatCreated: {trueOrFalse: boolean} = {trueOrFalse: false};
        // console.log("user:", user?._id)
        // console.log("el:", el._id)
        
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
      // console.log("pChats:", pChats)

      setPtentialChats(pChats);
    }

    getUsers();
  // }, [userChats]);
  }, []);

  useEffect(function() {
    async function getMessages() {
      const response: IMessages[] = await getRequest(`${BACK_END_URL}/messages/${currentChats._id}`);
      setMessages(response);
      // console.log("response:", response)
    }

    getMessages();
  }, [currentChats]);

  const sendTextMessage = useCallback(async function(
    textMessage: string, 
    sender: ISessionUser, 
    currentChatId: string, 
    setTextMessage: (textMessage: string) => void
    // setTextMessage: (textMessage: string) => string
  ) {
    if (!textMessage) console.log("You must type something...");
    if (sender._id !== undefined) {
      console.log("sender:", sender)
      const response: IMessages = await postRequest(`${BACK_END_URL}/messages`, JSON.parse(JSON.stringify({
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      })));
  
      setNewMessage(response);
      setMessages(function(prev) {
        return [...prev, response];
      })
      setTextMessage("");
    }
  }, []);

  const updateCurrentChat = useCallback(function(chat: IChats) {
    setCurrentChats(chat)
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
        updateCurrentChat,
        messages,
        currentChats,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}