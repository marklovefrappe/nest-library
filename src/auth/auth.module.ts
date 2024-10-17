import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/common/utils/utils.module';
import { AuthRepository } from './auth.repository';
import { DatabaseModule } from 'src/database/database.module';
import { AuthUtils } from './auth.utils';

@Module({
  imports: [UtilsModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthUtils],
})
export class AuthModule {}
