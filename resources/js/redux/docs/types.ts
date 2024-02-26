export interface DocsSliceState {
  data: DocsType[] | null;
  page: number;
  limit: number;
  total: number;
  error: string | null;
  loading: boolean;
}

export type DocsType = {
  id: number;
  name: string;
  avatar: string;
  document_name: string;
  files: string[];
  date_add: string;
  status: string;
  url: string;
  openPopOk: boolean;
  openPopCancel: boolean;
};
