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
export class RoleGuard implements CanActivate {
  constructor(private readonly authUtils: AuthUtils) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: GlobalType.Req = context.switchToHttp().getRequest();

    Logger.log('---------RoleGuard---------');
    const { userId, sessionId } = request;
    const session = await this.authUtils.getSession({
      userId,
      sessionId,
    });
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (session.userData.role !== 'admin') {
      throw new UnauthorizedException('User role unauthorized');
    }

    return true;
  }
}
