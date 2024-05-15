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
  Dropdown,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import {
  ExportOutlined,
  PrinterFilled,
  PaperClipOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  UploadOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps, UploadProps } from "antd";

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

const sortItems: MenuProps["items"] = [
  {
    key: "1",
    label: "дате создания",
  },
  {
    key: "2",
    label: "готовности",
  },
  {
    key: "3",
    label: "алфавиту",
  },
];

const Docs: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const { data, meta, page, limit, error, loading, confirmLoading } =
    useAppSelector((state: RootState) => state.docs);

  const [checkId, setCheckId] = useState(0);
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState(0);

  const fetchDocs = async (page: number) => {
    try {
      dispatch(loadDocsStart());
      const response = await docsAPI.getDocs(page);

      // if (response.success === false) {
      //   dispatch(loadDocsFailure(response.message));
      //   return;
      // }
      if (response) dispatch(loadDocsSuccess(response));
    } catch (error: unknown) {
      dispatch(loadDocsFailure((error as Record<string, string>).message));
    }
  };
  useEffect(() => {
    document.title = "Мои документы | ТопДомДок";

    fetchDocs(page);
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

  const handleCheckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setCheckLoading(true);
      // setFormData(info.file.originFileObj);
      const formData = new FormData();
      console.log(e.target.files);
      if (checkId && e.target.files) {
        formData.append("id", String(checkId));
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append("files[]", e.target.files[i]);
        }
      }

      const response = await docsAPI.uploadCheck(formData);
      if (response.success === false) {
        setCheckLoading(false);
        setCheckError(response.message);
        return;
      }
      setCheckLoading(false);
      setCheckError("");
    } catch (error) {
      setCheckLoading(false);
      setCheckError((error as Record<string, string>).message);
    }
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
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

      {meta && meta.total > 0 && (
        <>
          <Card className="mb-8">
            <Input.Search
              placeholder="Поиск документов..."
              allowClear
              // loading
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Card>
          <div className="flex justify-between mb-8">
            <span>
              Показано {meta.from}-{meta.to} из {meta.total} документов
            </span>

            <div className="flex justify-between gap-x-1 select-none">
              <span>Сортировка по: </span>
              <span
                onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
                className="cursor-pointer"
              >
                {order === "desc" ? <CaretDownOutlined /> : <CaretUpOutlined />}
              </span>
              <Dropdown
                menu={{
                  items: sortItems,
                  selectable: true,
                  defaultSelectedKeys: ["1"],
                  onSelect: (e) => {
                    setSort(+e.key - 1);
                  },
                }}
              >
                <Typography.Link>
                  {(sortItems as { key: string; label: string }[])[sort].label}
                </Typography.Link>
              </Dropdown>
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

                <div className="ml-auto text-right">
                  <label>
                    <input
                      onClick={() => setCheckId(item.id)}
                      onChange={handleCheckUpload}
                      type="file"
                      multiple
                      className="w-[22%] text-sm text-grey-500
                                  file:mr-5 file:py-2 file:px-6
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-medium
                                  file:bg-blue-50 file:text-blue-700
                                  hover:file:cursor-pointer hover:file:bg-amber-50
                                  hover:file:text-amber-700"
                    />
                  </label>
                  <span className="block ">
                    {checkLoading && "Чек загружается..."}
                  </span>
                </div>
              </div>
            ) : (
              "Кто ты, воин?"
            )}
          </Card>
        ))
      ) : (
        <Spin className="w-full text-center" size="large" />
      )}

      {meta && meta.total > 0 && (
        <Pagination
          onChange={(page) => fetchDocs(page)}
          className="mt-8 text-center"
          defaultCurrent={page}
          total={meta.total}
        />
      )}
      <FloatButton.BackTop />
    </section>
  );
};

export default Docs;
