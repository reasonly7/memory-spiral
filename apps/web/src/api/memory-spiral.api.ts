import { del, get, post } from "./request";

export interface MemorySpiralItem {
  id: string;
  name: string; // 名称
  content: string; // 内容, 对 `name` 进行一句话解释说明，常用句式为：“name 是一个 xxx，用于 yyyyyyyyyy。”
  count: number; // 关键词数量
}

export type FormModel = Pick<MemorySpiralItem, "name" | "content" | "count">;

export const todoPrefix = "/memory-spiral";

export const memorySpiralApi = {
  search() {
    return get<MemorySpiralItem[]>(`${todoPrefix}`);
  },

  create(formModel: FormModel) {
    return post<MemorySpiralItem>(`${todoPrefix}`, formModel);
  },

  remove(id: string) {
    return del<boolean>(`${todoPrefix}/${id}`);
  },
};
