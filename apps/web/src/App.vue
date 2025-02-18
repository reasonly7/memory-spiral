<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import Dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

Dayjs.extend(relativeTime);
</script>

<template>
  <ConfigProvider>
    <RouterView></RouterView>
  </ConfigProvider>
</template>
