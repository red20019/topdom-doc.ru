
import { UserType } from "../user/types";
import { Form } from "antd";
import type { GetRef } from "antd";

type FormInstance<T> = GetRef<typeof Form<T>>;

export interface BossSliceState {
  users: UserType[];
  data: Item[];
  dataSource:  Item[];
  editingKey: string | null;
  loading: boolean;
  error: string | null;
}

export interface Item {
  key: string;
  name: string;
  date: string;
}