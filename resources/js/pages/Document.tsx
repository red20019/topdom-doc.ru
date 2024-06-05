import { Layout, Result } from "antd";
import React, { Suspense, lazy, useEffect, useState } from "react";
// import FileViewer from "react-file-viewer-extended";
import { useNavigate, useParams } from "react-router-dom";

import { docsAPI } from "../api/api";
import Boss from "../components/Document/Boss";
import FileList from "../components/Document/FileList";
import {
  closePopconfirm,
  loadDocsFailure,
  setLoading,
  togglePopconfirm,
  updateStage,
} from "../redux/docs/docsSlice";
import { DocumentFilesType, DocumentType } from "../redux/docs/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { processFiles } from "../utils/processFiles";

const FileViewer = lazy(() => import("react-file-viewer-extended"));

const Document: React.FC<Record<string, boolean>> = ({
  matchesMax1270,
  matchesMax1000,
  matchesMax790,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const { data, confirmLoading } = useAppSelector(
    (state: RootState) => state.docs
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const [docData, setDocData] = useState<DocumentType>({
    id: 0,
    name: "",
    created_at: "",
    stage: -1,
    document_tracking: [],
    files: [],
    check_files: [],
  });

  const [file, setFile] = useState<DocumentFilesType>({
    filename: "",
    id: 0,
    path: "",
  });

  console.log(file);

  useEffect(() => {
    document.title = `Документ №${id} | ТопДомДок`;

    if (id) {
      const getDoc = async () => {
        try {
          dispatch(setLoading(true));
          const response = await docsAPI.getDocById(+id);
          if (response?.data) {
            const copiedResponse = JSON.parse(JSON.stringify(response)); // Deep copy of response object
            const files = copiedResponse.data.files;
            const checkFiles = copiedResponse.data.check_files;
            processFiles(files);
            processFiles(checkFiles);

            setDocData(copiedResponse.data);

            const formData = new FormData();
            response.data.files.forEach((file) => {
              formData.append(`files[]`, file.path);
            });
            response.data.check_files.forEach((file) => {
              formData.append(`files[]`, file.path);
            });
            await docsAPI.deleteTempFiles(formData);
            dispatch(setLoading(false));
          }
        } catch (error) {
          dispatch(loadDocsFailure((error as Record<string, string>).message));
        }
      };

      getDoc();
    }
  }, [id]);

  const openPopOk = data?.some((item) => {
    if (id && item.id === +id) return item.openPopOk;
  });
  const openPopCancel = data?.some((item) => {
    if (id && item.id === +id) return item.openPopCancel;
  });

  const handleStageClick = (id: number, status: string) => {
    dispatch(togglePopconfirm({ id, status }));
  };

  const handleOk = async (id: number, status: string) => {
    await dispatch(updateStage({ id, status }));
    dispatch(closePopconfirm(id));
    navigate("/documents");
  };

  const handleCancel = (id: number) => {
    dispatch(closePopconfirm(id));
  };

  if (id) {
    return (
      <Layout>
        <Layout.Content className="min-h-screen py-4 bg-white">
          {file.filename.endsWith(".jpg") ||
          file.filename.endsWith(".png") ||
          file.filename.endsWith(".webp") ||
          file.filename.endsWith(".avif") ||
          file.filename.endsWith(".svg") ||
          file.filename.endsWith(".gif") ? (
            <img
              src={file.path}
              alt="doc"
              className="w-full h-full object-cover"
            />
          ) : file.path ? (
            <div style={{ height: "100%" }}>
              <Suspense fallback={<Result title="Загрузка файла..." />}>
                <FileViewer
                  filePath={file.path}
                  fileType={file.filename?.split(".").pop()?.toLowerCase()}
                />
              </Suspense>
            </div>
          ) : (
            <Result title="Выберите файл для предпросмотра" />
          )}

          {currentUser?.role === "boss" ? (
            <Boss
              {...{
                id,
                stage: docData.stage,
                file,
                openPopOk,
                openPopCancel,
                handleOk,
                handleCancel,
                confirmLoading,
                handleStageClick,
              }}
            />
          ) : ""}
        </Layout.Content>

        <FileList
          {...{
            matchesMax790,
            matchesMax1000,
            matchesMax1270,
            id: +id,
            docData,
            setDocData,
            setFile,
            dispatch,
          }}
        />
      </Layout>
    );
  }
};

export default Document;
