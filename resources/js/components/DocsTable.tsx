import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  id: number;
  name: string;
  date: string;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Действия",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a className="text-blue-700">Изменить</a>
        <a className="text-red-500">Удалить</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    id: 1,
    name: "John Brown",
    date: "32",
    status: "Согласовано",
  },
  {
    key: "2",
    id: 2,
    name: "Jim Green",
    date: "42",
    status: "Оплачено",
  },
  {
    key: "3",
    id: 3,
    name: "Joe Black",
    date: "32",
    status: "Черновик",
  },
];

const DocsTable: React.FC = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default DocsTable;
