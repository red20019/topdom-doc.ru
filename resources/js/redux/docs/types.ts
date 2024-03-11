export interface DocsSliceState {
  data: DocsType[] | null;
  page: number;
  limit: number;
  total: number;
  error: string | null;
  loading: boolean;
  confirmLoading: boolean;
}

export type DocsType = {
  id: number;
  count_files: number;
  name: string;
  avatar: string;
  document_name: string;
  date_add: string;
  stage_number: number;
  stage_text: string;
  url: string;
  openPopOk: boolean;
  openPopCancel: boolean;
};
