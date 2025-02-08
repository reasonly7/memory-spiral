import { useUserInfo } from "@/composables/useUserInfo";
import { token } from "@/utils/token";
import HomeView from "@/views/home-view/HomeView.vue";
import LoginView from "@/views/login-view/LoginView.vue";
import RegisterView from "@/views/register-view/RegisterView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

export const enum RouteName {
  LOGIN = "LOGIN",
  HOME = "HOME",
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/login", name: RouteName.LOGIN, component: LoginView },
    { path: "/register", name: "RegisterView", component: RegisterView },
    { path: "/", redirect: { name: RouteName.HOME } },
    {
      path: "/home",
      name: RouteName.HOME,
      component: HomeView,
      meta: { needLogin: true },
    },
  ],
});

const { isExistUserInfo, getUserInfo } = useUserInfo();

router.beforeEach(async (to, from) => {
  const accessToken = token.get();
  if (to.meta.needLogin) {
    if (accessToken) {
      if (!isExistUserInfo.value) {
        await getUserInfo();
      }
    } else {
      return { name: RouteName.LOGIN, replace: true };
    }
  }

  // 登录后就不能再去到登录页
  if (to.name === RouteName.LOGIN && accessToken && to.name !== from.name) {
    return { name: from.name, replace: true };
  }
});
