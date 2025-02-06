import { authApi } from "@/api";
import { UserItem } from "@/api/auth.api";
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

const userInfo = useLocalStorage<Partial<UserItem>>("userInfo", {});

export const useUserInfo = () => {
  const getUserInfo = async () => {
    userInfo.value = (await authApi.me()) || {};
    return userInfo.value;
  };

  const isExistUserInfo = computed(() => !!userInfo.value.id);

  const clear = () => {
    userInfo.value = null;
  };

  return {
    getUserInfo,
    userInfo,
    clear,
    isExistUserInfo,
  };
};
