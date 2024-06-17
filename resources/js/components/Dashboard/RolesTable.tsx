import React from "react";
import { Card, Select, Table, TableProps } from "antd";
import { bossAPI } from "../../api";

interface DataType {
  key: string;
  id: number;
  name: string;
  role: "boss" | "user" | "accountant";
}

const data: DataType[] = [
  {
    key: '1',
    id: 1,
    name: "John Brown",
    role: "boss",
  },
  {
    key: '2',
    id: 2,
    name: "Jim Green",
    role: "user",
  },
  {
    key: '3',
    id: 3,
    name: "Joe Black",
    role: "accountant",
  },
];

const RolesTable: React.FC<{ loading: boolean }> = ({ loading }) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
        defaultValue={text}
          onChange={handleChange}
          style={{ width: 132 }}
          options={[
            { value: "user", label: "Пользователь" },
            { value: "accountant", label: "Бухгалтер" },
            { value: "boss", label: "Босс" },
          ]}
        />
      ),
    },
  ];

  const handleChange = async (value: string) => {
    console.log(`selected ${value}`);

    const formData = new FormData();
    formData.append("id", String(data[0].id));
    formData.append("role", value);

    const response = await bossAPI.changeRole(formData)
  };

  return (
    <Card title="Роли" loading={loading}>
      <Table columns={columns} dataSource={data} loading={loading} />
    </Card>
  );
};

export default RolesTable;
