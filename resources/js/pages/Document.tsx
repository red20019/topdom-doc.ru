import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Popconfirm, Result, Spin } from "antd";
// import FileViewer from "react-file-viewer-extended";
import { useNavigate, useParams } from "react-router-dom";

import { docsAPI } from "../api/api";
import CheckUpload from "../components/CheckUpload";
import {
  closePopconfirm,
  loadDocsFailure,
  setCheckError,
  setCheckLoading,
  setLoading,
  togglePopconfirm,
  updateStage,
  uploadChecks,
} from "../redux/docs/docsSlice";
import { DocumentFilesType, DocumentType } from "../redux/docs/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { mimeTypes } from "../utils/mimeTypes";

const FileViewer = lazy(() => import("react-file-viewer-extended"));

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
  overflow: "auto",
  right: 0,
  top: 0,
  bottom: 0,
  height: "100vh",
  position: "fixed",
};

type BossDocProps = {
  id: string;
  stage: number;
  openPopOk: boolean | undefined;
  openPopCancel: boolean | undefined;
  confirmLoading: boolean;
  handleOk: (id: number, status: string) => Promise<void>;
  handleCancel: (id: number) => void;
  handleStageClick: (id: number, status: string) => void;
};

const Document: React.FC<Record<string, boolean>> = ({
  matchesMax1270,
  matchesMax1000,
  matchesMax790,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const { data, error, loading, confirmLoading, checkLoading } = useAppSelector(
    (state: RootState) => state.docs
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [docData, setDocData] = useState<DocumentType>({
    id: 0,
    name: "",
    created_at: "",
    stage: -1,
    document_tracking: [],
    files: [],
    check_files: [],
  });

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

  const [file, setFile] = useState<DocumentFilesType>({
    filename: "",
    id: 0,
    path: "",
  });

  console.log(file);

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

  const handleCheckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      dispatch(setCheckLoading(true));
      const formData = new FormData();
      if (e.target.files) {
        formData.append("id", String(id));
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append("files[]", e.target.files[i]);
        }
      }

      const response = await docsAPI.uploadCheck(formData);
      if (response?.success === false) {
        dispatch(setCheckLoading(false));
        dispatch(setCheckError(response.message));
        return;
      }
      if (id) {
        await dispatch(updateStage({ id: +id, status: "accepted" }));
        dispatch(setCheckLoading(true));
        const newResponse = await docsAPI.getDocById(+id);
        dispatch(uploadChecks(+id));
        processFiles(newResponse.data.files);
        processFiles(newResponse.data.check_files);
        setDocData(newResponse.data);

        // Удаление временных файлов
        const FilesData = new FormData();
        newResponse.data.files.forEach((file) => {
          FilesData.append(`files[]`, file.path);
        });
        newResponse.data.check_files.forEach((file) => {
          FilesData.append(`files[]`, file.path);
        });
        await docsAPI.deleteTempFiles(FilesData);

        dispatch(setCheckError(""));
        dispatch(setCheckLoading(false));
      }
    } catch (error) {
      dispatch(setCheckLoading(false));
      dispatch(setCheckError((error as Record<string, string>).message));
    }
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
            <BossDoc
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
          ) : currentUser?.role === "user" ? (
            ""
          ) : (
            ""
          )}
        </Layout.Content>

        <Layout.Sider
          width={`${
            matchesMax790
              ? "80px"
              : matchesMax1270
              ? "20%"
              : matchesMax1000
              ? "25%"
              : "15%"
          }`}
          style={siderStyle}
        >
          <div className="flex flex-col gap-y-16 h-full">
            <div className="p-4 pt-7 max-h-[380px] overflowy-auto">
              <h3 className="text-lg font-semibold mb-3 lg:text-2xl">
                Документы
              </h3>
              {loading ? (
                <Spin size={"large"} indicator={<LoadingOutlined spin />} />
              ) : (
                docData &&
                docData.files.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setFile(item)}
                    title={item.filename}
                    className="mb-2 p-5 pl-11 bg-white text-black font-semibold break-words truncate border rounded cursor-pointer relative"
                  >
                    {item.filename}
                    <div
                      style={{
                        backgroundImage: `url(/images/${item.filename
                          ?.split(".")
                          .pop()
                          ?.toLowerCase()}-icon.svg)`,
                      }}
                      className={`absolute -translate-y-1/2 top-1/2 left-2 bg-contain bg-no-repeat w-7 h-7`}
                    ></div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 pt-7 max-h-[380px] overflowy-auto">
              <h3 className="text-lg font-semibold mb-3 lg:text-2xl">Чеки</h3>
              {loading ? (
                <Spin size={"large"} indicator={<LoadingOutlined spin />} />
              ) : (
                currentUser?.role === "accountant" &&
                docData &&
                docData.check_files.length === 0 &&
                !checkLoading && (
                  <CheckUpload
                    id={+id}
                    ref={inputRef}
                    handleCheckUpload={handleCheckUpload}
                    handleUploadClick={() => inputRef.current?.click()}
                  />
                )
              )}
              {checkLoading ? (
                <Spin size={"large"} indicator={<LoadingOutlined spin />} />
              ) : (
                docData &&
                docData.check_files.length > 0 &&
                !loading &&
                docData.check_files.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setFile(item)}
                    title={`Чек №${idx + 1}`}
                    className="mb-2 p-5 pl-11 bg-white text-black font-semibold break-words truncate border rounded cursor-pointer relative"
                  >
                    {`Чек №${idx + 1}`}
                    <div
                      style={{
                        backgroundImage: `url(/images/${item.filename
                          ?.split(".")
                          .pop()
                          ?.toLowerCase()}-icon.svg)`,
                      }}
                      className={`absolute -translate-y-1/2 top-1/2 left-2 bg-contain bg-no-repeat w-7 h-7`}
                    ></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Layout.Sider>
      </Layout>
    );
  }
};

function BossDoc(props: BossDocProps) {
  return (
    props.stage === 0 && (
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-end gap-x-3 pt-3">
        <StyleProvider hashPriority="high">
          <Popconfirm
            title="Подтвердите действие"
            description="Вы действительно хотите согласовать этот документ?"
            open={props.openPopOk}
            onConfirm={() => props.handleOk(+props.id, "accepted")}
            okButtonProps={{ loading: props.confirmLoading, type: "primary" }}
            onCancel={() => props.handleCancel(+props.id)}
          >
            <button
              onClick={() => props.handleStageClick(+props.id, "accepted")}
              className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
            >
              Согласовать
            </button>
          </Popconfirm>
          <Popconfirm
            title="Подтвердите действие"
            description="Вы действительно хотите отклонить этот документ?"
            open={props.openPopCancel}
            onConfirm={() => props.handleOk(+props.id, "rejected")}
            okButtonProps={{ loading: props.confirmLoading }}
            onCancel={() => props.handleCancel(+props.id)}
          >
            <button
              onClick={() => props.handleStageClick(+props.id, "rejected")}
              className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
            >
              Отклонить
            </button>
          </Popconfirm>
        </StyleProvider>
      </div>
    )
  );
}

// function AccountantDoc(props: {
//   id: string;
//   file: string;
//   checkLoading: boolean;
// }) {
//   return (
//     props.file && (
//       <CheckUpload {...props} />
//     )
//   );
// }

export default Document;

async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch("/" + url);
  const blob = await response.blob();
  return new File([blob], fileName);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result?.toString().split(",")[1];
      if (base64Data) {
        const fileExtension = file.name.split(".").pop();
        let mimeType = "application/octet-stream";
        if (fileExtension) {
          mimeType = mimeTypes[fileExtension] || mimeType;
        }
        resolve(`data:${mimeType};base64, ` + base64Data);
      } else {
        reject("Error converting file to base64");
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

async function processFiles(files: DocumentFilesType[]) {
  for (const file of files) {
    try {
      const url = file.path;
      const filename = file.filename;
      const convertedFile = await urlToFile(url, filename);
      const base64Data = await fileToBase64(convertedFile);
      file.path = base64Data;
    } catch (error) {
      console.error(`Error converting file ${file.filename}:`, error);
    }
  }
}
