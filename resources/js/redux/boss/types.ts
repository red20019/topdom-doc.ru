import { FormInstance } from "antd";
import { UserType } from "../user/types";

export interface BossSliceState {
  users: UserType[];
  data: Item[];
  form:  FormInstance<any> | null;
  editingKey: string | null;
  loading: boolean;
  error: string | null;
}

export interface Item {
  key: string;
  name: string;
  date: string;
}