export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  ERROR = 'ERROR',
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  membership_tier: string;
  avatar_url: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  errorCode?: string;
}