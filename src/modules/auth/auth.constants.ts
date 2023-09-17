export const TOKEN = {
  ACCESS_TOKEN: {
    SECRET: 'refresh_token_secret',
    EXPIRES_IN: '2h',
  },
  REFRESH_TOKEN: {
    SECRET: 'access_token_secret',
    EXPIRES_IN: '14d',
  },
};

export const USER_ALREADY_EXISTS = 'UserAlreadyExists';
export const USER_NOT_FOUND = 'UserNotFound';
export const INVALID_CREDENTIALS = 'InvalidCredentials';
