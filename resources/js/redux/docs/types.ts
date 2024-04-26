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

export type DocsResponse = {
  data: DocsType[] | null;
  links: Record<string, string>;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
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
};

export type DocumentTrackingType = {
  date_start_stage: string;
  date_end_stage: string;
  stage_document: string;
  id: number;
};

export type DocumentFilesType = {
  filename: string;
  id: number;
  path: string;
};
