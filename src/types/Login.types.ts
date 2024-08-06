export interface LoginTypes {
  email: string,
  password: string,
}

export interface LoginResponseTypes extends LoginTypes {
  token: string,
}