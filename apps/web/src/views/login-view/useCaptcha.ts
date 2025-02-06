import captchaApi from "@/api/captcha.api";
import { toReactive } from "@vueuse/core";
import { ref } from "vue";

export const useCaptcha = () => {
  const sessionId = ref<string>();
  const img = ref<string>();

  const refresh = async () => {
    const captchaObj = await captchaApi.captcha();
    sessionId.value = captchaObj?.sessionId;
    if (captchaObj?.svg) {
      const base64 = btoa(captchaObj.svg);
      img.value = `data:image/svg+xml;base64,${base64}`;
    }
  };

  return toReactive({
    sessionId,
    img,
    refresh,
  });
};
