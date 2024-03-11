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

  useEffect(() => {
    document.title = `Документ №${id}  | ТопДомДок`;
    const getDoc = async () => {
      if (id) {
        const response = await docsAPI.getDocById(+id);
        console.log(response);
      }

      getDoc();
    };
  }, []);

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
  // const file = "/docx/docx.docx";
  // const type = "docx";

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
            {docs &&
              docs.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setFile(item)}
                  className="p-5 bg-white text-black border rounded cursor-pointer"
                >
                  {item}
                </div>
              ))}
          </div>
        </Layout.Sider>
      </Layout>
    );
  }
};

export default Document;
