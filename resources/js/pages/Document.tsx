import React, { useEffect, useState } from "react";
import { Button, Layout, Popconfirm, Result, Spin, Upload } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import {
  LoadingOutlined,
  UploadOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import FileViewer from "react-file-viewer";
import { useParams } from "react-router-dom";

import { docsAPI } from "../api/api";
import {
  closePopconfirm,
  togglePopconfirm,
  updateStage,
} from "../redux/docs/docsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { DocumentType } from "../redux/docs/types";

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
  file: string;
  openPopOk: boolean | undefined;
  openPopCancel: boolean | undefined;
  confirmLoading: boolean;
  handleOk: (id: number, status: string) => Promise<void>;
  handleCancel: (id: number) => void;
  handleStageClick: (id: number, status: string) => void;
};

const Document: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const { data, error, confirmLoading, checkLoading } = useAppSelector(
    (state: RootState) => state.docs
  );
  const { id } = useParams();

  const [docData, setDocData] = useState<DocumentType | null>(null);

  useEffect(() => {
    document.title = `Документ №${id} | ТопДомДок`;

    if (id) {
      const getDoc = async () => {
        const response = await docsAPI.getDocById(+id);
        if (response) {
          console.log(response);
          setDocData(response.data);
        }
      };

      getDoc();
    }
  }, [id]);

  const [file, setFile] = useState("");
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
    dispatch(updateStage({ id, status }));
  };

  const handleCancel = (id: number) => {
    dispatch(closePopconfirm(id));
  };

  if (id) {
    return (
      <Layout>
        <Layout.Content className="min-h-screen py-4">
          {file.endsWith(".jpg") ||
          file.endsWith(".png") ||
          file.endsWith(".gif") ? (
            <img
              src={"/" + file}
              alt="doc"
              className="w-full h-full object-cover"
            />
          ) : file ? (
            <div style={{ height: "auto" }}>
              <FileViewer
                filePath={"/" + file}
                fileType={file.split(".").pop()}
              />
            </div>
          ) : (
            <Result title="Выберите документ для предпросмотра" />
          )}

          {currentUser?.role === "boss" ? (
            <BossDoc
              {...{
                id,
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
            <UserDoc file={file} />
          ) : currentUser?.role === "accountant" ? (
            <AccountantDoc {...{ id, file, checkLoading }} />
          ) : (
            "Кто ты, воин?"
          )}
        </Layout.Content>

        <Layout.Sider width="15%" style={siderStyle}>
          <div className="flex flex-col gap-y-2 p-4 pt-7">
            {docData ? (
              docData.files.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFile(item.path)}
                  title={item.filename}
                  className="p-5 pl-11 bg-white text-black font-semibold break-words truncate border rounded cursor-pointer relative"
                >
                  {item.filename}
                  <div
                    style={{
                      backgroundImage: `url(/images/${item.filename
                        .split(".")
                        .pop()}-icon.svg)`,
                    }}
                    className={`absolute -translate-y-1/2 top-1/2 left-2 bg-contain bg-no-repeat w-7 h-7`}
                  ></div>
                </div>
              ))
            ) : (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
              />
            )}
          </div>
        </Layout.Sider>
      </Layout>
    );
  }
};

function BossDoc(props: BossDocProps) {
  return (
    props.file && (
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

function UserDoc(props: Record<string, string>) {
  return (
    props.file && (
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-end gap-x-3 pt-3">
        <button
          // onClick={() => props.handleStageClick(+props.id, "accepted")}
          className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
        >
          Заглушка
        </button>
      </div>
    )
  );
}

function AccountantDoc(props: {
  id: string;
  file: string;
  checkLoading: boolean;
}) {
  return (
    props.file && (
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <div className="flex justify-end gap-x-3">
          <div className="flex gap-x-3 mb-3">
            <span className="text-lg">
              <CheckCircleTwoTone twoToneColor="#52c41a" /> Чек загружен
            </span>
            <span className="text-lg">
              <CloseCircleTwoTone twoToneColor="red" /> Чек не загружен
            </span>
          </div>
        </div>
        <Upload className="block ml-auto w-[142px]" {...props}>
          <Button icon={<UploadOutlined />}>
            {props.checkLoading ? "Чек загружается" : "Загрузить чек"}
          </Button>
        </Upload>
      </div>
    )
  );
}

export default Document;
