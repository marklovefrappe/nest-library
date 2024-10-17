import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as Type from './utils.type';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilsService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * Convert time string (like '1y', '1h', '30m', '10s') into a specified unit (sec, min, h).
   * @param inputTime The time string (e.g., '1y', '1h', '30m', '10s').
   * @param outputUnit The unit you want the output to be in: 'sec', 'min', or 'h'.
   * @returns The converted time in the specified unit.
   */
  convertTime(
    inputTime: string,
    outputUnit: 'sec' | 'min' | 'h' | 'y',
  ): number {
    const match = inputTime.match(/^(\d+)([smhy])$/);
    if (!match) {
      throw new Error('Invalid time format');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    let timeInMs: number;

    switch (unit) {
      case 's':
        timeInMs = value * 1000;
        break;
      case 'm':
        timeInMs = value * 1000 * 60;
        break;
      case 'h':
        timeInMs = value * 1000 * 60 * 60;
        break;
      case 'y':
        timeInMs = value * 1000 * 60 * 60 * 24 * 365; // Approximate conversion for 1 year
        break;
      default:
        throw new Error('Invalid unit');
    }

    switch (outputUnit) {
      case 'sec':
        return timeInMs / 1000;
      case 'min':
        return timeInMs / (1000 * 60);
      case 'h':
        return timeInMs / (1000 * 60 * 60);
      case 'y':
        return timeInMs / (1000 * 60 * 60 * 24 * 365); // Convert to years
      default:
        throw new Error('Invalid output unit');
    }
  }

  /**
   * Format a number to have a comma as a thousands separator.
   * @param number The number to format.
   * @returns The formatted number with commas.
   */
  formatNumberWithCommas(number: number): string {
    return number.toLocaleString();
  }

  /**
   * Capitalize the first letter of a string.
   * @param text The string to capitalize.
   * @returns The string with the first letter capitalized.
   */
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Generate a random string of a given length.
   * @param length The length of the random string.
   * @returns A random string of the specified length.
   */
  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  signToken({ type, signData, options }: Type.SignToken.Param): string {
    let _options = options;
    if (!_options) {
      _options = {
        algorithm: 'HS256',
        secret: this.config.get('jwt.secret'),
      };
    }

    let expiresIn = _options.expiresIn;
    if (!expiresIn) {
      if (type === 'access') {
        expiresIn = '5m';
      }
      if (type === 'refresh') {
        expiresIn = '1y';
      }
      _options = {
        ..._options,
        expiresIn,
      };
    }

    const token = this.jwtService.sign(signData, _options);
    return token;
  }

  verifyToken<T extends object>(token: string): T {
    const payload = this.jwtService.verify<T>(token, {
      secret: this.config.get('jwt.secret'),
    });

    return payload;
  }

  generateTokenId(): string {
    const token = uuid();

    return token;
  }

  getRedisKey({
    domain,
    userId,
    authType,
    sessionId,
    wildcard = true,
    searchKey,
  }: Type.GetRedisKey.Param): string {
    let key = ``;

    if (domain) {
      key += `${domain}:`;
    }

    if (userId) {
      key += `user:${userId}:`;
    }

    if (authType) {
      key += `${authType}:`;
    }

    if (sessionId) {
      key += `sessionId:${sessionId}`;
    }

    if (wildcard) {
      key = `*` + key + `*`;
    }

    if (searchKey) {
      key = searchKey;
    }

    return key;
  }
}
