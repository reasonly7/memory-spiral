import authApi from "@/api/auth.api";
import { toReactive, useToggle } from "@vueuse/core";
import { LoginFormModel } from "./login-form";
import { reactive } from "vue";

export const useLogin = () => {
  const [loading, loadingToggle] = useToggle(false);
  const formModel = reactive<LoginFormModel>({
    username: "",
    password: "",
    verifyCode: "",
  });

  const submit = async (sessionId: string) => {
    loadingToggle(true);
    const res = await authApi.login({
      ...formModel,
      sessionId,
    });
    loadingToggle(false);
    if (res) {
      localStorage.accessToken = res.accessToken;
    } else {
      throw new Error("Login Failed");
    }
  };

  return toReactive({ submit, loading, formModel });
};
