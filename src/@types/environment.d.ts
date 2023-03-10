export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ACCESS_TOKEN_SIGNATURE: string;
      REFRESH_TOKEN_SIGNATURE: string;
      ACESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }
}
