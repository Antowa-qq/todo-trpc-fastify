import { compare, hash } from 'bcryptjs';
import { TRPCError } from '@trpc/server';
import { User } from '@prisma/client';
import { UserService } from '@modules/user/user.service';
import { AuthTokenService } from './auth-token.service';

import { LoginInput, RefreshTokensInput, RegistrationInput } from './auth.inputs';
import { AuthResponse, RegistrationResponse, TokenTypeEnum } from './auth.models';
import { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, USER_NOT_FOUND } from './auth.constants';

export class AuthService {
  private userService = new UserService();
  private authTokenService = new AuthTokenService();

  private async validate(loginInput: LoginInput): Promise<User> {
    const user = await this.userService.findByLogin(loginInput.login);

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: USER_NOT_FOUND });
    }

    const isPasswordCorrect = await compare(loginInput.password, user.password);

    if (isPasswordCorrect) {
      return user;
    }

    throw new TRPCError({ code: 'FORBIDDEN', message: INVALID_CREDENTIALS });
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.validate(loginInput);

    return this.authTokenService.generateTokensAndSave(user);
  }

  async registration(registrationInput: RegistrationInput): Promise<RegistrationResponse> {
    const { login, password, name } = registrationInput;
    const foundUser = await this.userService.findByLogin(login);

    if (foundUser) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: USER_ALREADY_EXISTS });
    }

    const hashedPassword = await hash(password, 5);

    const user = await this.userService.create({
      login,
      password: hashedPassword,
      name,
    });

    const { accessToken, refreshToken } = await this.authTokenService.generateTokensAndSave(user);

    return {
      id: user.id,
      login,
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokensInput: RefreshTokensInput): Promise<AuthResponse> {
    const { refreshToken } = refreshTokensInput;
    const { sub: userId } = await this.authTokenService.validateToken(refreshToken, TokenTypeEnum.REFRESH_TOKEN);

    if (!userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const user = await this.userService.findById(Number(userId));

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: USER_NOT_FOUND });
    }

    if (!user?.refreshToken) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const isTokenCorrect = await compare(refreshToken, user.refreshToken);

    if (!isTokenCorrect) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return this.authTokenService.generateTokensAndSave(user);
  }
}
