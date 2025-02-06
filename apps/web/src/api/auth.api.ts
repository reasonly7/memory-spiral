import { get, post } from "./request";

const authPrefix = "/auth";

export interface RegisterParams {
  username: string;
  password: string;
  verifyCode: string;
  email: string;
  sessionId: string;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export type LoginParams = Omit<RegisterParams, "email">;

export default {
  login(params: LoginParams) {
    return post<{ accessToken: string }>(`${authPrefix}/login`, params);
  },

  register(params: RegisterParams) {
    return post<boolean>(`${authPrefix}/register`, params);
  },

  me() {
    return get<UserItem>(`${authPrefix}/me`);
  },
};
