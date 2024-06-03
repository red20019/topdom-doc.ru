import React, { useEffect, useState } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Card,
  Dropdown,
  Empty,
  FloatButton,
  Input,
  Pagination,
  Spin,
  Typography,
} from "antd";

import { docsAPI } from "../api/api";
import DocItem from "../components/Docs/DocItem";
import {
  loadDocsFailure,
  loadDocsSuccess,
  setLoading
} from "../redux/docs/docsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

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

  const { data, meta, page } = useAppSelector((state: RootState) => state.docs);

  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState(0);

  const fetchDocs = async (page: number) => {
    try {
      dispatch(setLoading(true));
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

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  if (data?.length === 0) {
    return (
      <Empty
        className="container mx-auto px-4 py-4"
        description="Документов не найдено."
      />
    );
  }

  return (
    <section className="container mx-auto ml-8 px-4 py-4">
      {data?.length === 0 && (
        <h2 className="text-3xl font-bold mb-8 text-center">Мои документы</h2>
      )}

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
        data.map((item) => <DocItem key={item.id} {...item} />)
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