export type SignInCredentials = {
  username: string
  password: string
  grant_type?: string
  client_id?: string
  client_secret?: string
}

export type SignUpCredentials = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type SignInResponse = Session

export type SignUpResponse = Partial<User>

export type User = {
  id: number
  name: string
  email: string
  email_verified_at: boolean | null
  created_at: string
  updated_at: string
  source: string | null
  roles: string[]
}

export interface Session {
  access_token: string;
  user: User | null;
  token_type: string;
  expires_in?: number;
  expires_at?: number;
  refresh_token?: string;
}

