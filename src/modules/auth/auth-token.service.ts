import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from '@modules/user/user.service';

import { TOKEN } from './auth.constants';
import { AuthResponse, AuthTokens, AuthTokenData, TokenTypeEnum } from './auth.models';

export class AuthTokenService {
  private userService = new UserService();

  async generateTokensAndSave(user: User): Promise<AuthResponse> {
    const tokens: AuthTokens = await this.generateTokens(user);
    const { refreshToken } = tokens;

    await this.saveRefreshToken(user.id, refreshToken);

    return { ...tokens, userId: user.id };
  }

  async validateToken(token: string, tokenType: TokenTypeEnum): Promise<AuthTokenData> {
    const data = jwt.verify(token, TOKEN[tokenType].SECRET) as AuthTokenData;
    return data;
  }

  private async generateTokens(user: User): Promise<AuthTokens> {
    const payload = { userId: user.id, login: user.login };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload.userId),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(userId: number, token: string): Promise<void> {
    const hashedToken = await hash(token, 5);
    await this.userService.updateRefresherToken(userId, hashedToken);
  }

  private generateAccessToken({ userId, login }: { userId: number; login: string }): string {
    return jwt.sign({ sub: userId, login }, TOKEN.ACCESS_TOKEN.SECRET, {
      expiresIn: TOKEN.ACCESS_TOKEN.EXPIRES_IN,
    });
  }

  private generateRefreshToken(userId: number): string {
    return jwt.sign({ sub: userId }, TOKEN.REFRESH_TOKEN.SECRET, {
      expiresIn: TOKEN.REFRESH_TOKEN.EXPIRES_IN,
    });
  }
}
