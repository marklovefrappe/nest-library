import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Logger,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginSchema, LoginZodDto } from './dto/login.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createUserSchema, CreateUserZodDto } from './dto/signup-zod.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { refreshSchema } from './dto/refresh.dto';
import * as GlobalType from 'src/type/global.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Post('token/signup')
  async signup(@Body() signupDto: CreateUserZodDto) {
    return await this.authService.signup(signupDto);
  }

  @UsePipes(new ZodValidationPipe(loginSchema))
  @Post('token/login')
  async login(@Body() loginDto: LoginZodDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Post('token/refresh')
  async refresh(@Req() req: GlobalType.Req) {
    Logger.log(req.userId, req.sessionId);
    const validationResult = refreshSchema.safeParse({
      userId: req.userId,
      sessionId: req.sessionId,
    });
    if (!validationResult.data) {
      throw new BadRequestException('Validation failed');
    }
    Logger.log(req.userId);
    return this.authService.refresh(req);
  }
}
