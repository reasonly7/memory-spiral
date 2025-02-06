import { useUserInfo } from "@/composables/useUserInfo";
import { RouteName, router } from "@/router";
import { toReactive } from "@vueuse/core";

export const useLogout = () => {
  const logout = () => {
    delete localStorage.accessToken;
    useUserInfo().clear();
    router.push({ name: RouteName.LOGIN });
  };

  return toReactive({
    logout,
  });
};
