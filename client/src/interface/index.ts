export interface ContextProviderProps {
  children: React.ReactNode
  // user?: Record<string, string>
  user: ISessionUser
}

export interface ISessionUser {
  _id?: string
  name?: string
  email: string
  password: string
}

// type PropsUser = Pick<ISessionUser, 'email' | 'password'>

// export interface ISessionUser extends PropsUser {}

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
  // userChats: ISessionUser[]
  userChats: IUserChat[]
  // potentialChats: ISessionUser[]
}

export interface IChats {
  _id?: string
  members?: string[],
  firstId?: string,
  secondId?: string,
}

export interface IUserChat extends IChats, ISessionUser {}