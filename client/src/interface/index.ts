export type ImportMetaEnv = {
  readonly VITE_BACKEND_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}

export interface ContainerProps {
  children: React.ReactNode
}

export interface IRegister {
  name: string
  email: string
  password: string
}

export interface IUser {
  name: string
  email: string
  password: string
}

export interface TAuthContext {
  // user: Record<string, string> // ? SE USA CUANDO ES UN OBJETO QUE CONTIENE LO QUE SEA
  user: IUser | null
  registerInfo: IRegister
  setRegisterInfo: React.Dispatch<React.SetStateAction<IRegister>>
  updateRegisterInfo: (info: IRegister) => void
  registerUser: (e: React.FormEvent<HTMLFormElement>) => void
  logoutUser: () => void
}