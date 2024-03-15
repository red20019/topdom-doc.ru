import React, { useEffect, useState } from "react";
import { Layout, Popconfirm } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
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
import { DocType } from "../types/types";

const siderStyle: React.CSSProperties = {
  textAlign: "left",
  color: "white",
  overflow: "auto",
  right: 0,
  top: 0,
  bottom: 0,
};

const Document: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, confirmLoading } = useAppSelector(
    (state: RootState) => state.docs
  );
  const { id } = useParams();

  const [docData, setDocData] = useState<DocType | null>(null);

  useEffect(() => {
    document.title = `Документ №${id} | ТопДомДок`;

    if (id) {
      const getDoc = async () => {
        const response = await docsAPI.getDocById(+id);
        console.log(response);
        setDocData(response.data);
      };

      getDoc();
    }
  }, [id]);

  const [file, setFile] = useState("");

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

  const docs = [
    "/pdf/dummy.pdf",
    "/docx/docx.docx",
    "/images/sierra_nevada_bg.jpg",
  ];

  if (id) {
    return (
      <Layout>
        <Layout.Content className="min-h-screen">
          <div style={{ height: "auto" }}>
            <FileViewer filePath={file} fileType={file.split(".").pop()} />;
          </div>
        </Layout.Content>

        <Layout.Sider width="15%" style={siderStyle}>
          <div className="flex justify-end gap-x-3 pt-3">
            <StyleProvider hashPriority="high">
              <Popconfirm
                title="Подтвердите действие"
                description="Вы действительно хотите согласовать этот документ?"
                open={openPopOk}
                onConfirm={() => handleOk(+id, "accepted")}
                okButtonProps={{ loading: confirmLoading, type: "primary" }}
                onCancel={() => handleCancel(+id)}
              >
                <button
                  onClick={() => handleStageClick(+id, "accepted")}
                  className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
                >
                  Согласовать
                </button>
              </Popconfirm>
              <Popconfirm
                title="Подтвердите действие"
                description="Вы действительно хотите отклонить этот документ?"
                open={openPopCancel}
                onConfirm={() => handleOk(+id, "rejected")}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={() => handleCancel(+id)}
              >
                <button
                  onClick={() => handleStageClick(+id, "rejected")}
                  className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
                >
                  Отклонить
                </button>
              </Popconfirm>
            </StyleProvider>
          </div>
          <div className="flex flex-col gap-y-2 p-4">
            {docData &&
              docData.files.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFile(item.path)}
                  className="p-5 bg-white text-black border rounded cursor-pointer position-relative"
                >
                  {item.filename}
                  <div
                    style={{
                      backgroundImage: `url(/images/${item.filename
                        .split(".")
                        .pop()}-icon.svg)`,
                    }}
                    className={`position-absolute bot-0 left-1/2 -translate-x-1/2 bg-contain bg-no-repeat w-5 h-5`}
                  ></div>
                </div>
              ))}
          </div>
        </Layout.Sider>
      </Layout>
    );
  }
};

export default Document;
