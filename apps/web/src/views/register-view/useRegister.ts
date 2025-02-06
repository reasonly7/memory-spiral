import authApi from "@/api/auth.api";
import { toReactive, useToggle } from "@vueuse/core";
import { RegisterFormModel } from "./register-form";
import { reactive } from "vue";
import { router } from "@/router";

export const useRegister = () => {
  const [loading, loadingToggle] = useToggle(false);

  const formModel = reactive<RegisterFormModel>({
    username: "",
    password: "",
    verifyCode: "",
    email: "",
  });

  const submit = async (sessionId: string) => {
    loadingToggle(true);
    const success = await authApi.register({
      ...formModel,
      sessionId,
    });
    loadingToggle(false);
    if (success) {
      router.replace("/login");
    } else {
      throw new Error("Register Failed");
    }
  };

  return toReactive({ submit, loading, formModel });
};
