import { UserType } from "../user/types";

export interface BossSliceState {
  users: UserType[];
  loading: boolean;
  error: string | null;
}