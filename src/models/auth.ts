export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  ERROR = 'ERROR',
}

export interface LoginRequest {
  email: string;
  passwordHash: string;
}

export interface UserDto {
  id: string;
  email: string;
  username: string;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errorCode: string;
}