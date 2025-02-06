<script setup lang="ts">
import { SvgIcon } from "@/components/svg-icon";
import { Button, Form, Input, Skeleton, Tooltip } from "ant-design-vue";
import { useLogout } from "./useLogout";
import { onMounted, ref } from "vue";
import { todoListApi, TodoListItem } from "@/api/todo-list.api";
import Dayjs from "dayjs";
import { useLocalStorage } from "@vueuse/core";

const logout = useLogout();
const list = useLocalStorage<TodoListItem[]>("todoList", []);
const title = ref("");
const loading = ref(false);
const removeStashId = ref<string | null>(null);

const search = async () => {
  removeStashId.value = null;
  loading.value = true;
  list.value = (await todoListApi.search()) || [];
  loading.value = false;
};
const create = async () => {
  const newItem = await todoListApi.create(title.value);
  if (!newItem) {
    return;
  }
  list.value.unshift(newItem);
  title.value = "";
};
const remove = async (id: string, index: number) => {
  if (removeStashId.value === null || removeStashId.value !== id) {
    removeStashId.value = id;
    return;
  }

  const success = await todoListApi.remove(id);
  if (!success) {
    return;
  }
  list.value.splice(index, 1);
  removeStashId.value = null;
};

onMounted(() => {
  if (list.value.length === 0) {
    search();
  }
});
</script>

<template>
  <div class="page-wrapper">
    <header class="page-header">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" />
      <h1 class="app-title">Todo List</h1>
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
      <Form name="searchForm" class="search-form-wrapper" @submit="create">
        <Input placeholder="Add todo ..." autofocus v-model:value="title" />

        <Tooltip title="新增" placement="right">
          <Button type="primary" htmlType="submit">
            <template #icon>
              <SvgIcon type="plus"></SvgIcon>
            </template>
          </Button>
        </Tooltip>

        <div class="right-wrapper">
          <Tooltip title="刷新" placement="left">
            <Button type="text" @click="search">
              <template #icon>
                <SvgIcon type="refresh-cw"></SvgIcon>
              </template>
            </Button>
          </Tooltip>
        </div>
      </Form>

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
            <span class="title" :title="item.title">{{ item.title }}</span>
            <span class="date">{{ Dayjs(item.createdAt).fromNow() }}</span>
          </li>
        </template>
      </ul>
    </main>
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
    .search-form-wrapper {
      width: 100%;
      height: 48px;
      display: flex;
      gap: 12px;
      align-items: center;
      :deep(.ant-input) {
        width: 256px;
      }
      .right-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    .list-wrapper {
      list-style: none;
      padding-left: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      .list-item {
        display: flex;
        gap: 12px;
        align-items: center;
        height: 36px;
        &:hover {
          color: rgba(0, 0, 0, 1);
        }
        .title {
          flex: 1;
          width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .date {
          color: rgba(5, 5, 5, 0.4);
        }
        &.removing {
          .title {
            color: tomato;
          }
        }
      }
    }
  }
}
</style>
