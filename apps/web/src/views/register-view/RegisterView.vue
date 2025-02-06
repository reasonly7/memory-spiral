<script setup lang="ts">
import { onMounted } from "vue";
import { Card } from "ant-design-vue";

import { RegisterForm } from "./register-form";
import { useRegister } from "./useRegister";

import { useCaptcha } from "../login-view";

const captcha = useCaptcha();
const register = useRegister();

onMounted(() => {
  captcha.refresh();
});
</script>

<template>
  <div class="register-view">
    <Card title="Register" class="card-wrapper" :bordered="false">
      <RegisterForm
        v-model:formModel="register.formModel"
        :captcha="captcha.img"
        :loading="register.loading"
        @register="register.submit(captcha.sessionId!).catch(captcha.refresh)"
        @refresh="captcha.refresh()"
      ></RegisterForm>

      <RouterLink to="/login">Back to Login</RouterLink>
    </Card>
  </div>
</template>

<style scoped lang="less">
.register-view {
  background-color: #eff2ef;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-wrapper {
    width: 270px;
  }
}
</style>
