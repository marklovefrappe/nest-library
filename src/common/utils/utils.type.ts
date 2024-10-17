import { JwtSignOptions } from '@nestjs/jwt';

export namespace SignToken {
  export type Param = {
    signData: object;
    options?: JwtSignOptions;
    type: 'access' | 'refresh';
  };
  // export type Result = {
  //   accessToken: string;
  //   refreshToken: string;
  // };
}

// export namespace VerifyToken {
//   export type Param = {
//     token: string;
//     options: JwtSignOptions;
//   };
// }

export namespace GenerateTokenId {
  export type Result = {
    tokenId: string;
    refreshTokenId: string;
  };
}

export namespace GetRedisKey {
  export type Param = {
    domain?: 'auth';
    authType?: 'token';
    userId?: number;
    sessionId?: string;
    wildcard: boolean;
    searchKey?: string;
  };
}
