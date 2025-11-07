export interface ApiLoginResponse {
  status: boolean;
  message?: string;
  token?: string;
  user?: {
      username: string;
      name: string;
    };
}
