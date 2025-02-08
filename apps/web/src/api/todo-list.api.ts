import { del, get, post } from "./request";

export interface TodoListItem {
  id: string;
  name: string; // 名称
  content: string; // 内容, 对 `name` 进行一句话解释说明，常用句式为：“name 是一个 xxx，用于 yyyyyyyyyy。”
  link: string | null; // 链接，某些 name 可能会指向一个特定的链接，所以需要存一下
}

export type FormModel = Pick<TodoListItem, "name" | "content" | "link">;

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
