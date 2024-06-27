import React from "react";
import { Card, Select, Table, TableProps } from "antd";
import { bossAPI } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeRole } from "../../redux/boss/bossSlice";
import { UserTypeWithKey } from "../../redux/user/types";

interface DataType {
  key: string;
  id: number;
  name: string;
  role: "boss" | "user" | "accountant";
}

const RolesTable: React.FC<{ loading: boolean }> = ({ loading }) => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state) => state.boss);
  const columns: TableProps<UserTypeWithKey>["columns"] = [
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
          onChange={(value) => handleChange(value, +record.key)}
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

  const handleChange = async (role: string, id: number) => {
    console.log(`selected ${role}`);

    // const formData = new FormData();
    // formData.append("id", String(data[0].id));
    // formData.append("role", value);

    // const response = await bossAPI.changeRole(formData)
    dispatch(changeRole({ id, role }));
  };

  return (
    <Card title="Роли" loading={loading}>
      <Table columns={columns} dataSource={users} loading={loading} />
    </Card>
  );
};

export default RolesTable;
