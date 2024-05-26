export interface IUsers {
  _id?: string
  name: string
  email: string
  password: string
}

export interface IProfileGoogle {
  id?: string
  displayName: string// * Nombre completo
  name?: {
    familyName: string// Apellido
    givenName: string// Nombre
  }
  emails: {
    value: string
    verified: boolean
  }[]
  photos?: {
    value: string
  }[]
  provider?: string
  _json?: {
    name: string// * Nombre completo
    picture: string
    email: string
    email_verified: boolean
  }
}