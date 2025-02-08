import { useUserInfo } from "@/composables/useUserInfo";
import { RouteName, router } from "@/router";
import { token } from "@/utils/token";
import { toReactive } from "@vueuse/core";

export const useLogout = () => {
  const logout = () => {
    token.remove();
    useUserInfo().clear();
    router.push({ name: RouteName.LOGIN });
  };

  return toReactive({
    logout,
  });
};
