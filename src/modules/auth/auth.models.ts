export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokenData {
  sub: string;
}

export interface AuthResponse {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface RegistrationResponse {
  id: number;
  login: string;
  accessToken: string;
  refreshToken: string;
}

export interface TokenConfig {
  SECRET: string;
  EXPIRES_IN: string;
}

export enum TokenTypeEnum {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
