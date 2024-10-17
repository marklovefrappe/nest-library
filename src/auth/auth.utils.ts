import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UtilsService } from 'src/common/utils/utils.service';
import * as GlobalType from 'src/type/global.type';
import * as Type from './auth.type';

@Injectable()
export class AuthUtils {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly utilsService: UtilsService,
  ) {}

  async getSession<T>(
    verifiedData: GlobalType.Auth.VerifiedData<T>,
  ): Promise<GlobalType.Auth.SessionData | null> {
    const redisKey = this.utilsService.getRedisKey({
      domain: 'auth',
      userId: verifiedData.userId,
      authType: 'token',
      sessionId: verifiedData.sessionId,
      wildcard: false,
    });

    const sessionData =
      await this.cacheManager.get<GlobalType.Auth.SessionData>(redisKey);

    return sessionData ?? null;
  }

  async setSession<T>(
    verifiedData: GlobalType.Auth.VerifiedData<T>,
    data: GlobalType.Auth.SessionData,
  ): Promise<void> {
    const redisKey = this.utilsService.getRedisKey({
      domain: 'auth',
      userId: verifiedData.userId,
      authType: 'token',
      sessionId: verifiedData.sessionId,
      wildcard: false,
    });

    await this.cacheManager.set(redisKey, data, {
      ttl: this.utilsService.convertTime('1y', 'sec'),
    } as any);
  }

  async clearSession<T>(
    verifiedData: GlobalType.Auth.VerifiedData<T>,
  ): Promise<void> {
    const redisKey = this.utilsService.getRedisKey({
      domain: 'auth',
      userId: verifiedData.userId,
      authType: 'token',
      sessionId: verifiedData.sessionId,
      wildcard: false,
    });

    await this.cacheManager.del(redisKey);
  }

  generateAuthTokenId(): Type.Utils.GenerateAuthTokenId.Result {
    const accessTokenId = this.utilsService.generateTokenId();
    const refreshTokenId = this.utilsService.generateTokenId();

    return {
      accessTokenId,
      refreshTokenId,
    };
  }

  signAuthtoken(signData: object): Type.Utils.signAuthtoken.Result {
    const accessToken = this.utilsService.signToken({
      type: 'access',
      signData,
    });
    const refreshToken = this.utilsService.signToken({
      type: 'refresh',
      signData,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
