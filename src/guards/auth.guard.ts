import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { AuthUtils } from 'src/auth/auth.utils';
import { UtilsService } from 'src/common/utils/utils.service';
import * as GlobalType from 'src/type/global.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly authUtils: AuthUtils,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: GlobalType.Req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    Logger.log('---------AuthGuard---------');
    Logger.log(token);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload =
        this.utilsService.verifyToken<GlobalType.Auth.BaseVerifiedData>(token);
      const { userId, sessionId } = payload;
      Logger.log(payload);

      const session = await this.authUtils.getSession({
        userId,
        sessionId,
      });
      if (!session) {
        throw new UnauthorizedException('Session not found');
      }

      request.userId = payload.userId;
      request.sessionId = payload.sessionId;
    } catch (error: any) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const token = request.headers.authorization?.split(' ')[1];
    return token;
  }
}
