
import { UserType } from "../user/types";

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