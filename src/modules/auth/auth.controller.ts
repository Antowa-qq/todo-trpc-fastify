import { LoginInput, RegistrationInput, RefreshTokensInput } from './auth.inputs';
import { AuthService } from './auth.service';

export class AuthController {
  private authService = new AuthService();

  login(input: LoginInput) {
    return this.authService.login(input);
  }

  registration(input: RegistrationInput) {
    return this.authService.registration(input);
  }

  refreshTokens(input: RefreshTokensInput) {
    return this.authService.refreshTokens(input);
  }
}
