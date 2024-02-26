import React, { useEffect, useState } from "react";
import { Card, Popconfirm, Skeleton, Steps, Pagination, Result } from "antd";
import { Link } from "react-router-dom";
import {
  ExportOutlined,
  PrinterFilled,
  PaperClipOutlined,
} from "@ant-design/icons";
import { docsAPI } from "../api/api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  loadDocsFailure,
  loadDocsStart,
  loadDocsSuccess,
  togglePopconfirm,
} from "../redux/docs/docsSlice";

const cardStyle: React.CSSProperties = {
  marginTop: 6,
  width: "100%",
};

const Docs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, total, page, limit, error, loading } = useAppSelector(
    (state: RootState) => state.docs
  );

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

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleStageClick = (id: number) => {
    dispatch(togglePopconfirm(id));
  };

  const handleOk = async (id: number, status: string) => {
    try {
      setConfirmLoading(true);
      const response = await docsAPI.updateStage(id, status);
      // console.log(response);

      if (response.success === false) {
        console.log(response.message);
        return;
      }
      setConfirmLoading(false);
    } catch (error: unknown) {
      setConfirmLoading(false);
      dispatch(loadDocsFailure((error as Record<string, string>).message));
    }
  };

  const handleCancel = (id: number) => {
    dispatch(togglePopconfirm(id));
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Мои документы</h2>

      {total > 0 ? (
        <div className="flex justify-between mb-8">
          <span>{total} документов</span>

          <div className="flex justify-between w-[200px]">
            <span>Сортировка по:</span>
            <span className="text-blue-500 cursor-pointer">дате изменения</span>
          </div>
        </div>
      ) : (
        <Result status="warning" title="Документов не найдено." />
      )}

      {data &&
        data.map((item) => (
          <Card key={item.id} style={cardStyle} loading={loading}>
            <div className="flex justify-between items-start gap-x-6 mb-6">
              <h3 className="text-base sm:text-xl">{item.document_name}</h3>

              <div className="flex flex-wrap gap-5 min-w-[100px] text-right">
                <Link className="" to={`/documents/${item.id}`}>
                  <ExportOutlined />
                </Link>
                <span className="cursor-pointer">
                  <PrinterFilled />
                </span>
                <span className="">№ {item.id}</span>
                <span className="">
                  <PaperClipOutlined /> {item.files ? item.files : 0}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-start mb-3">
              <span>
                Создан {item.date_add}, {item.name}
              </span>

              <div className="">
                <Steps
                  labelPlacement="vertical"
                  size="small"
                  current={1}
                  percent={item.status.includes("рассмотрении") ? 50 : 0}
                  status={
                    item.status.includes("На рассмотрении")
                      ? "process"
                      : item.status.includes("рассмотрен")
                      ? "finish"
                      : item.status.includes("отклонен")
                      ? "wait"
                      : "error"
                  }
                  items={[
                    {
                      title: "Черновик",
                    },
                    {
                      title: "Согласование",
                      subTitle: item.status,
                    },
                    {
                      title: "Исполнение",
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end gap-x-3">
              <Popconfirm
                title="Подтвердите действие"
                description="Вы действительно хотите согласовать этот документ?"
                open={item.openPop}
                onConfirm={() => handleOk(item.id, "accepted")}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={() => handleCancel(item.id)}
              >
                <button
                  onClick={() => handleStageClick(item.id)}
                  className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
                >
                  Согласовать
                </button>
              </Popconfirm>

              <Popconfirm
                title="Подтвердите действие"
                description="Вы действительно хотите отклонить этот документ?"
                open={item.openPop}
                onConfirm={() => handleOk(item.id, "rejected")}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={() => handleCancel(item.id)}
              >
                <button
                  onClick={() => handleStageClick(item.id)}
                  className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
                >
                  Отклонить
                </button>
              </Popconfirm>
            </div>
          </Card>
        ))}

      {total > 0 && (
        <Pagination
          className="mt-8 text-center"
          defaultCurrent={page}
          total={total}
        />
      )}
    </section>
  );
};

export default Docs;
