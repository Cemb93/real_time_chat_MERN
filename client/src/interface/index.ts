export type ImportMetaEnv = {
  readonly VITE_BACKEND_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}

export interface ContainerProps {
  children: React.ReactNode
}

export interface IRegisterUser {
  name: string
  email: string
  password: string
}

type PropsUser = Pick<IRegisterUser, 'email' | 'password'>

export interface ILoginUser extends PropsUser {}

export interface TAuthContext {
  // user: Record<string, string> // ? SE USA CUANDO ES UN OBJETO QUE CONTIENE LO QUE SEA
  user: IRegisterUser | null
  registerInfo: IRegisterUser
  loginInfo: ILoginUser
  setRegisterInfo: React.Dispatch<React.SetStateAction<IRegisterUser>>
  updateRegisterInfo: (info: IRegisterUser) => void
  updateLoginInfo: (info: ILoginUser) => void
  registerUser: (e: React.FormEvent<HTMLFormElement>) => void
  loginUser: (e: React.FormEvent<HTMLFormElement>) => void
  logoutUser: () => void
}