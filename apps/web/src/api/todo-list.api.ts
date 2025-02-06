import { del, get, post } from "./request";

export interface TodoListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const todoPrefix = "/todo-list";

export const todoListApi = {
  search() {
    return get<TodoListItem[]>(`${todoPrefix}`);
  },

  create(title: string) {
    return post<TodoListItem>(`${todoPrefix}`, { title });
  },

  remove(id: string) {
    return del<boolean>(`${todoPrefix}/${id}`);
  },
};
