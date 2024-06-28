import React, { useRef, useState } from "react";
import {
  Table,
  Popconfirm,
  Form,
  Input,
  InputRef,
  Card,
} from "antd";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { deleteItem, save } from "../../redux/boss/bossSlice";

interface Item {
  key: string;
  name: string;
  date: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <tr {...props} />
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = Form.useFormInstance();

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = async () => {
    try {
      const values = await (Array.isArray(form)
        ? form[0]
        : form
      )?.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const DocsTable: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { dataSource } = useAppSelector((state) => state.boss);
  console.log(dataSource);
  const dispatch = useAppDispatch();

  const handleDelete = (key: string) => {
    dispatch(deleteItem(key));
  };

  const handleSave = (row: Item) => {
    dispatch(save({ key: row.key, data: row }));
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Дата",
      dataIndex: "date",
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: any, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Вы уверены, что хотите удалить этот документ?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a className="text-red-500">Удалить</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Card title="Документы" loading={loading}>
      <Table
        rowClassName={() => "editable-row"}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={columns.map((col) => ({
          ...col,
          onCell: (record: Item) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: handleSave,
          }),
        }))}
      />
    </Card>
  );
};

export default DocsTable;
