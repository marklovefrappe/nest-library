import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { CreateUserZodDto } from './dto/signup-zod.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UtilsService } from 'src/common/utils/utils.service';
import { AuthRepository } from './auth.repository';
import * as argon2 from 'argon2';
import { LoginZodDto } from './dto/login.dto';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Req } from 'src/type/global.type';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManeger: Cache,
    private readonly authUtils: AuthUtils,
    private readonly db: AuthRepository,
    private readonly config: ConfigService,
  ) {}

  async signup(signupDto: CreateUserZodDto) {
    const { email, password } = signupDto;

    const user = await this.db.getUserByFields({ email });
    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await argon2.hash(password);
    const _signupDto = {
      ...signupDto,
      confirmPassword: undefined,
      password: hashedPassword,
    };

    await this.db.createUser(_signupDto);
    return 'Create user successfully';
  }

  async login(loginDto: LoginZodDto) {
    const { email, password: candidatePassword } = loginDto;
    const user = await this.db.getUserByFields({ email });
    if (!user) {
      throw new Error('User not exists');
    }

    const { id, name, email: _email, phoneNumber, role, password } = user;
    const isPasswordValid = await argon2.verify(password, candidatePassword);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const userData = {
      id,
      name,
      email: _email,
      phoneNumber,
      role: String(role),
    };

    const tokenId = this.authUtils.generateAuthTokenId();
    const { refreshTokenId } = tokenId;

    const signData = {
      userId: id,
      sessionId: refreshTokenId,
    };
    const token = this.authUtils.signAuthtoken(signData);
    const { accessToken, refreshToken } = token;

    const storeData = {
      userData,
      tokenId,
      token,
    };
    await this.authUtils.setSession(
      { userId: id, sessionId: refreshTokenId },
      storeData,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(req: Req) {
    const { userId, sessionId } = req;
    const session = await this.authUtils.getSession({ userId, sessionId });
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    const { accessTokenId, refreshTokenId } =
      this.authUtils.generateAuthTokenId();

    const signData = {
      userId,
      sessionId: refreshTokenId,
    };
    const { accessToken, refreshToken } =
      this.authUtils.signAuthtoken(signData);

    await Promise.all([
      this.authUtils.setSession({ userId, sessionId: refreshTokenId }, session),
      this.authUtils.clearSession({ userId, sessionId }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
