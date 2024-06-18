import React, { useState } from "react";
import { Space, Table, Popconfirm, Card } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  id: number;
  name: string;
  date: string;
  status: string;
}

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

const DocsTable: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setEditingRowIndex(index);
  };

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
          <Popconfirm
            title="Удалить этот документ?"
            open={open === record.id.toString()}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            cancelButtonProps={{ disabled: confirmLoading }}
            onCancel={handleCancel}
          >
            <a onClick={() => handleRemove(record)} className="text-red-500">
              Удалить
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleRemove = (record: DataType) => {
    if (!confirmLoading) setOpen(record.id.toString());
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(null);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(null); // Close the Popconfirm if canceled
    setConfirmLoading(false);
  };

  return (
    <Card title="Документы" loading={loading}>
      <Table columns={columns} dataSource={data} loading={loading} />
    </Card>
  );
};

export default DocsTable;
