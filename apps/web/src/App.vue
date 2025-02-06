<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import Dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

Dayjs.locale("zh-cn");
Dayjs.extend(relativeTime);
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <RouterView></RouterView>
  </ConfigProvider>
</template>
