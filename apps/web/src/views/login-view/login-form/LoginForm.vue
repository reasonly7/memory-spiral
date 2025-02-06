<script setup lang="ts">
import {
  Button,
  Form,
  FormInstance,
  FormItem,
  Input,
  InputPassword,
} from "ant-design-vue";
import { LoginFormModel } from "./types";
import { ref } from "vue";

defineProps<{
  captcha?: string;
  loading?: boolean;
}>();
const emits = defineEmits<{
  login: [];
  refresh: [];
}>();

const formModel = defineModel<LoginFormModel>("formModel", { required: true });
const formRef = ref<FormInstance | null>(null);
</script>

<template>
  <Form
    ref="formRef"
    name="login"
    :model="formModel"
    layout="vertical"
    @finish="emits('login')"
  >
    <FormItem name="username" required>
      <Input
        autofocus
        v-model:value="formModel.username"
        placeholder="Username"
      />
    </FormItem>

    <FormItem name="password" required>
      <InputPassword
        v-model:value="formModel.password"
        placeholder="Password"
      />
    </FormItem>

    <FormItem required name="verifyCode">
      <div class="captcha-wrapper">
        <Input
          class="captcha-input"
          v-model:value="formModel.verifyCode"
          placeholder="Code"
        />
        <img
          alt="captcha"
          class="captcha-img"
          :src="captcha"
          @click="emits('refresh')"
        />
      </div>
    </FormItem>

    <FormItem>
      <Button block htmlType="submit" type="primary">
        Login{{ loading ? "ing" : "" }}
      </Button>
    </FormItem>
  </Form>
</template>

<style scoped lang="less">
.captcha-wrapper {
  height: 32px;
  display: flex;
  gap: 5px;
  .captcha-input {
    flex: 1;
  }
  .captcha-img {
    height: 100%;
    cursor: pointer;
  }
}
</style>
