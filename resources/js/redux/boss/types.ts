
import { UserType, UserTypeWithKey } from "../user/types";

export interface BossSliceState {
  users: UserTypeWithKey[];
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