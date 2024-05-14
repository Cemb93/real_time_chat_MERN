export interface ContextProviderProps {
  children: React.ReactNode
  // user?: Record<string, string>
  user?: ISessionUser | null
}

export interface ISessionUser {
  _id: string
  name: string
  email: string
  password?: string
}

export interface TAuthContext {
  // user: Record<string, string> // ? SE USA CUANDO ES UN OBJETO QUE CONTIENE LO QUE SEA
  user: ISessionUser
  registerInfo: ISessionUser
  loginInfo: ISessionUser
  setRegisterInfo: React.Dispatch<React.SetStateAction<ISessionUser>>
  updateRegisterInfo: (info: ISessionUser) => void
  updateLoginInfo: (info: ISessionUser) => void
  registerUser: (e: React.FormEvent<HTMLFormElement>) => void
  loginUser: (e: React.FormEvent<HTMLFormElement>) => void
  logoutUser: () => void
}

export type TChatContext = {
  // userChats: Record<string, string>[]
  userChats: IChats[]
  // userChats: IUserChat[]
  potentialChats: ISessionUser[]
  messages: IMessages[]
  currentChats: IChats
  // createChat: (firstId: string, secondId: string) => Promise<void>
  createChat: (firstId: string, secondId: string) => void
  updateCurrentChat: (chat: IChats) => void
  sendTextMessage: (
    textMessage: string, 
    sender: ISessionUser, 
    currentChatId: string, 
    // setTextMessage: (textMessage: string) => string
    setTextMessage: (textMessage: string) => void
  ) => void
}

export interface IChats {
  _id?: string
  members?: string[],
  firstId?: string,
  secondId?: string,
}

// type OmitPropChat = Omit<IChats, '_id'>

// export interface IUserChat extends OmitPropChat, ISessionUser {}

export interface IMessages {
  _id?: string
  chatId: string,
  senderId: string,
  text: string,
  createdAt: string,
}