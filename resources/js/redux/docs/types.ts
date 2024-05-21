export interface DocsSliceState {
  data: DocsType[] | null;
  page: number;
  limit: number;
  meta: DocumentMeta | null;
  error: string | null;
  loading: boolean;
  confirmLoading: boolean;
  checkLoading: boolean;
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
  is_check: boolean
};

export type DocsResponse = {
  data: DocsType[] | null;
  links: Record<string, string>;
  meta: DocumentMeta;
};

export type DocumentResponse = {
  data: DocumentType | null;
  message: string;
  success: boolean;
};

export type DocumentType = {
  id: number;
  name: string;
  created_at: string;
  stage: number;
  document_tracking: DocumentTrackingType[];
  files: DocumentFilesType[];
  check_files: DocumentFilesType[];
};

export type DocumentTrackingType = {
  date_start_stage: string;
  date_end_stage: string;
  stage_document: string;
  id: number;
};

export type DocumentFilesType = {
  id: number;
  path: string;
  filename?: string;
};

export type DocumentMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};
