import { Verify } from 'crypto';
import { Request } from 'express';

export type User = {
  userId: number;
  sessionId: string;
};

export type Req = Request & User;

export namespace Auth {
  export type BaseVerifiedData = {
    userId: number;
    sessionId: string;
  };

  export type VerifiedData<T = {}> = BaseVerifiedData & T;

  export type UserData = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string | null;
    role: string;
  };

  export type TokenId = {
    accessTokenId: string;
    refreshTokenId: string;
  };

  export type Token = {
    accessToken: string;
    refreshToken: string;
  };

  export type SessionData = {
    userData: UserData;
    tokenId: TokenId;
    token: Token;
  };
}
