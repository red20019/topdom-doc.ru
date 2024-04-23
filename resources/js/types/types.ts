export type NotificationType = "success" | "info" | "warning" | "error";

export type DocType = {
  created_at: string;
  document_tracking: DocumentTrackingType[];
  files: DocumentFilesType[];
  id: number;
  name: string;
  stage: number;
};

type DocumentTrackingType = {
  id: number;
  date_end_stage: string;
  date_start_stage: string;
  stage_document: string;
};

type DocumentFilesType = {
  filename: string;
  id: number;
  path: string;
};
