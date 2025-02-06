import { get } from "./request";

const prefix = "/captcha";

export type CaptchaObj = {
  sessionId: string;
  svg: string;
};

export default {
  captcha() {
    return get<CaptchaObj>(prefix);
  },
};
