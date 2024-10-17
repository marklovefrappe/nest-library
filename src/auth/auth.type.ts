export namespace Utils {
  export namespace signAuthtoken {
    export type Result = {
      accessToken: string;
      refreshToken: string;
    };
  }

  export namespace GenerateAuthTokenId {
    export type Result = {
      accessTokenId: string;
      refreshTokenId: string;
    };
  }
}
