import React, { useEffect, useState } from "react";
import {
  Card,
  Popconfirm,
  Steps,
  Pagination,
  Spin,
  Empty,
  Input,
  FloatButton,
  Upload,
  message,
  Button,
} from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { Link } from "react-router-dom";
import {
  ExportOutlined,
  PrinterFilled,
  PaperClipOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

import { docsAPI } from "../api/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  closePopconfirm,
  loadDocsFailure,
  loadDocsStart,
  loadDocsSuccess,
  togglePopconfirm,
  updateStage,
} from "../redux/docs/docsSlice";

const cardStyle: React.CSSProperties = {
  marginTop: 6,
  width: "100%",
};

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Docs: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const { data, total, page, limit, error, loading, confirmLoading } =
    useAppSelector((state: RootState) => state.docs);

  useEffect(() => {
    document.title = "Мои документы | ТопДомДок";

    const fetchDocs = async () => {
      try {
        dispatch(loadDocsStart());
        const response = await docsAPI.getDocs(page);
        // console.log(response);

        if (response.success === false) {
          dispatch(loadDocsFailure(response.message));
          return;
        }
        dispatch(loadDocsSuccess(response.data));
      } catch (error: unknown) {
        dispatch(loadDocsFailure((error as Record<string, string>).message));
      }
    };

    fetchDocs();
  }, []);

  const handleStageClick = (id: number, status: string) => {
    dispatch(togglePopconfirm({ id, status }));
  };

  const handleOk = async (id: number, status: string) => {
    dispatch(updateStage({ id, status }));
  };

  const handleCancel = (id: number) => {
    dispatch(closePopconfirm(id));
  };

  if (!data && !loading) {
    return (
      <Empty
        className="container mx-auto px-4 py-4"
        description="Документов не найдено."
      />
    );
  }

  return (
    <section className="container mx-auto ml-8 px-4 py-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Мои документы</h2>

      {total > 0 && (
        <>
          <Card className="mb-8">
            <Input.Search
              placeholder="Поиск документов..."
              allowClear
              // onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Card>
          <div className="flex justify-between mb-8">
            <span>{total} документов</span>

            <div className="flex justify-between w-[200px]">
              <span>Сортировка по:</span>
              <span className="text-blue-500 cursor-pointer">
                дате изменения
              </span>
            </div>
          </div>
        </>
      )}

      {data ? (
        data.map((item) => (
          <Card key={item.id} style={cardStyle} loading={loading}>
            <div className="flex justify-between items-start gap-x-6 mb-6">
              <Link to={`/documents/${item.id}`}>
                <h3 className="text-base sm:text-xl">{item.document_name}</h3>
              </Link>

              <div className="flex flex-wrap gap-5 min-w-[100px] text-right">
                <Link to={`/documents/${item.id}`}>
                  <ExportOutlined />
                </Link>
                <span className="cursor-pointer">
                  <PrinterFilled />
                </span>
                <span className="">№ {item.id}</span>
                <span className="">
                  <PaperClipOutlined /> {item.count_files}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-start mb-3">
              <span>
                Создан {item.date_add}, {item.name}
              </span>

              <div className="-mr-9">
                <Steps
                  labelPlacement="vertical"
                  size="small"
                  current={item.stage_number}
                  status={item.stage_number > 3 ? "error" : "finish"}
                  items={[
                    {
                      title: "Черновик",
                    },
                    {
                      title: "Согласование",
                    },
                    {
                      title: "Оплата",
                    },
                    {
                      title: "Готово",
                    },
                  ]}
                />
              </div>
            </div>

            {currentUser?.role === "boss" ? (
              <div className="flex justify-end gap-x-3">
                <Popconfirm
                  title="Подтвердите действие"
                  description="Вы действительно хотите согласовать этот документ?"
                  open={item.openPopOk}
                  onConfirm={() => handleOk(item.id, "accepted")}
                  okButtonProps={{
                    loading: confirmLoading,
                    type: "primary",
                    style: { backgroundColor: "#1677ff", color: "white" },
                  }}
                  onCancel={() => handleCancel(item.id)}
                >
                  <button
                    onClick={() => handleStageClick(item.id, "accepted")}
                    className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
                  >
                    Согласовать
                  </button>
                </Popconfirm>
                <Popconfirm
                  title="Подтвердите действие"
                  description="Вы действительно хотите отклонить этот документ?"
                  open={item.openPopCancel}
                  onConfirm={() => handleOk(item.id, "rejected")}
                  okButtonProps={{
                    loading: confirmLoading,
                    type: "primary",
                    style: { backgroundColor: "#1677ff", color: "white" },
                  }}
                  onCancel={() => handleCancel(item.id)}
                >
                  <button
                    onClick={() => handleStageClick(item.id, "rejected")}
                    className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
                  >
                    Отклонить
                  </button>
                </Popconfirm>
              </div>
            ) : currentUser?.role === "user" ? (
              <button
                // onClick={() => handleStageClick(item.id, "rejected")}
                className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
              >
                Заглушка
              </button>
            ) : currentUser?.role === "accountant" ? (
              <div className="">
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
                  <Upload className="block text-right" {...props}>
                    <Button icon={<UploadOutlined />}>Загрузить чек</Button>
                  </Upload>
              </div>
            ) : (
              "Кто ты, воин?"
            )}
          </Card>
        ))
      ) : (
        <Spin className="w-full text-center" size="large" />
      )}

      {total > 0 && (
        <Pagination
          className="mt-8 text-center"
          defaultCurrent={page}
          total={total}
        />
      )}
      <FloatButton.BackTop />
    </section>
  );
};

export default Docs;
