<script setup lang="ts">
import { SvgIcon } from "@/components/svg-icon";
import {
  Button,
  Form,
  FormItem,
  Input,
  Skeleton,
  Tooltip,
  Textarea,
  Modal,
} from "ant-design-vue";
import { useLogout } from "./useLogout";
import { onMounted, ref } from "vue";
import { memorySpiralApi, MemorySpiralItem } from "@/api/memory-spiral.api";
import { useCreateUpdateForm } from "./useCreateUpdateForm";

const logout = useLogout();
const list = ref<MemorySpiralItem[]>([]);
const loading = ref(false);
const removeStashId = ref<string | null>(null);
const form = useCreateUpdateForm();

const search = async () => {
  removeStashId.value = null;
  loading.value = true;
  list.value = (await memorySpiralApi.search()) || [];
  loading.value = false;
};
const create = async () => {
  const newItem = await memorySpiralApi.create(form.model);
  if (!newItem) {
    return;
  }
  list.value.push(newItem);
};
const remove = async (id: string, index: number) => {
  if (removeStashId.value === null || removeStashId.value !== id) {
    removeStashId.value = id;
    return;
  }

  const success = await memorySpiralApi.remove(id);
  if (!success) {
    return;
  }
  list.value.splice(index, 1);
  removeStashId.value = null;
};

onMounted(() => {
  search();
});
</script>

<template>
  <div class="page-wrapper">
    <header class="page-header">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" />
      <h1 class="app-title">Memory Spiral</h1>
      <div class="right-wrapper">
        <Tooltip title="退出" placement="left">
          <Button type="text" @click="logout.logout">
            <template #icon>
              <SvgIcon type="log-out"></SvgIcon>
            </template>
          </Button>
        </Tooltip>
      </div>
    </header>

    <main class="page-main">
      <ul class="list-wrapper">
        <Skeleton active v-if="loading"></Skeleton>
        <template v-else>
          <li
            class="list-item"
            v-for="(item, index) in list"
            :class="{ removing: item.id === removeStashId }"
          >
            <Button
              type="text"
              @click="remove(item.id, index)"
              :danger="item.id === removeStashId"
            >
              <template #icon>
                <SvgIcon type="x"></SvgIcon>
              </template>
            </Button>
            <span class="name" :title="item.name">{{ item.name }}</span>
            <span class="content" :title="item.content">{{
              item.content
            }}</span>
          </li>
        </template>
      </ul>
    </main>

    <Modal>
      <Form
        name="searchForm"
        class="search-form-wrapper"
        @submit="create"
        layout="horizontal"
        ref="formRef"
        :model="form.model"
      >
        <FormItem name="name" required>
          <Input
            class="name-input"
            placeholder="name"
            v-model:value="form.model.name"
          />
        </FormItem>

        <FormItem name="content" required>
          <Textarea
            class="content-input"
            placeholder="content"
            v-model:value="form.model.content"
          ></Textarea>
        </FormItem>

        <Button type="primary" htmlType="submit">
          <template #icon>
            <SvgIcon type="plus"></SvgIcon>
          </template>
        </Button>
      </Form>
    </Modal>
  </div>
</template>

<style scoped lang="less">
@headerHeight: 56px;

.page-wrapper {
  min-height: 100%;
  min-width: 400px;
  padding-top: @headerHeight;
  background-color: #f5f5f5;
  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @headerHeight;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    z-index: 10;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    .logo {
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    .app-title {
      margin-bottom: 0;
      font-weight: 600;
      font-size: 18px;
    }
    .right-wrapper {
      flex: 1;
      width: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .page-main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .list-wrapper {
      list-style: none;
      padding-left: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      margin-bottom: 0;
      .list-item {
        display: flex;
        gap: 12px;
        align-items: center;
        height: 36px;
        &:hover {
          color: rgba(0, 0, 0, 1);
        }
        .content {
          flex: 1;
          width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &.removing {
          .name,
          .content {
            color: tomato;
          }
        }
      }
    }
  }
}
</style>
