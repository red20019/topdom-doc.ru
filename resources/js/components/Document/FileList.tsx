import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import React, { useRef } from "react";

import { docsAPI } from "../../api";
import {
  setCheckError,
  setCheckLoading,
  updateStage,
  uploadChecks,
} from "../../redux/docs/docsSlice";
import { DocumentFilesType, DocumentType } from "../../redux/docs/types";
import { useAppSelector } from "../../redux/hooks";
import { AppDispatch, RootState } from "../../redux/store";
import { processFiles } from "../../utils/processFiles";
import CheckUpload from "../CheckUpload";

type FileListProps = {
  matchesMax790: boolean;
  matchesMax1000: boolean;
  matchesMax1270: boolean;
  id: number;
  docData: DocumentType;
  setDocData: (value: React.SetStateAction<DocumentType>) => void;
  setFile: (value: React.SetStateAction<DocumentFilesType>) => void;
  dispatch: AppDispatch;
};

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

const FileList: React.FC<FileListProps> = ({
  matchesMax790,
  matchesMax1000,
  matchesMax1270,
  id,
  docData,
  setDocData,
  setFile,
  dispatch,
}) => {
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { loading, checkLoading } = useAppSelector(
    (state: RootState) => state.docs
  );

  const inputRef = useRef<HTMLInputElement>(null);

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
        await dispatch(updateStage({ id, status: "accepted" }));
        dispatch(setCheckLoading(true));
        const newResponse = await docsAPI.getDocById(id);
        dispatch(uploadChecks(id));
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

  return (
    <Layout.Sider
      width={`${
        matchesMax790
          ? "100%"
          : matchesMax1270
          ? "20%"
          : matchesMax1000
          ? "25%"
          : "15%"
      }`}
      style={{
        ...siderStyle,
        height: matchesMax790 ? "105px" : "100vh",
        top: matchesMax790 ? "auto" : 0,
        overflowX: matchesMax790 ? "auto" : "hidden",
        overflowY: matchesMax790 ? "hidden" : "auto",
      }}
    >
      <div
        className={`flex gap-y-16 h-full ${
          matchesMax790 ? "flex-row" : "flex-col"
        }`}
      >
        <div
          className={`p-4 max-h-[380px] ${
            matchesMax790 ? "pt-2 w-1/2" : "pt-7"
          }`}
        >
          <h3 className="text-xs font-semibold mb-3 sm:text-lg">
            Документы ({docData.files.length > 0 ? docData.files.length : '-'})
          </h3>
          <div
            className={`flex ${
              matchesMax790
                ? "flex-row gap-x-2 overflow-x-auto overflow-y-hidden"
                : "flex-col"
            }`}
          >
            {loading ? (
              <Spin size={"large"} indicator={<LoadingOutlined spin />} />
            ) : (
              docData &&
              docData.files.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFile(item)}
                  title={item.filename}
                  className={`bg-white text-black font-semibold break-words truncate border rounded cursor-pointer relative ${
                    matchesMax790
                      ? "mb-0 p-2 pl-7 text-xs min-w-[93px]"
                      : "mb-2 p-5 pl-11"
                  }`}
                >
                  {item.filename}
                  <div
                    style={{
                      backgroundImage: `url(/images/${item.filename
                        ?.split(".")
                        .pop()
                        ?.toLowerCase()}-icon.svg)`,
                    }}
                    className={`absolute -translate-y-1/2 top-1/2 left-2 bg-contain bg-no-repeat ${
                      matchesMax790 ? "w-4 h-4" : "w-7 h-7"
                    }`}
                  ></div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className={`p-4 max-h-[380px] ${
            matchesMax790 ? "pt-2 w-1/2" : "pt-7"
          }`}
        >
          <h3 className="text-xs font-semibold mb-3 sm:text-lg">
            Чеки ({docData.check_files.length > 0 ? docData.check_files.length : '-'})
          </h3>
          <div
            className={`flex ${
              matchesMax790
                ? "flex-row gap-x-2 overflow-x-auto overflow-y-hidden"
                : "flex-col"
            }`}
          >
            {loading ? (
              <Spin size={"large"} indicator={<LoadingOutlined spin />} />
            ) : (
              currentUser?.role === "accountant" &&
              docData &&
              docData.check_files.length === 0 &&
              !checkLoading && (
                <CheckUpload
                  id={id}
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
                  className={`bg-white text-black font-semibold break-words truncate border rounded cursor-pointer relative ${
                    matchesMax790
                      ? "mb-0 p-2 pl-7 text-xs min-w-[90px]"
                      : "mb-2 p-5 pl-11"
                  }`}
                >
                  {`Чек №${idx + 1}`}
                  <div
                    style={{
                      backgroundImage: `url(/images/${item.filename
                        ?.split(".")
                        .pop()
                        ?.toLowerCase()}-icon.svg)`,
                    }}
                    className={`absolute -translate-y-1/2 top-1/2 left-2 bg-contain bg-no-repeat ${
                      matchesMax790 ? "w-4 h-4" : "w-7 h-7"
                    }`}
                  ></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout.Sider>
  );
};

export default FileList;
