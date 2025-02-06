import { del, get, post } from "./request";

export interface TodoListItem {
  id: string;
  name: string;
  content: string;
}

export type FormModel = Pick<TodoListItem, "name" | "content">;

export const todoPrefix = "/todo-list";

export const todoListApi = {
  search() {
    return get<TodoListItem[]>(`${todoPrefix}`);
  },

  create(formModel: FormModel) {
    return post<TodoListItem>(`${todoPrefix}`, formModel);
  },

  remove(id: string) {
    return del<boolean>(`${todoPrefix}/${id}`);
  },
};
