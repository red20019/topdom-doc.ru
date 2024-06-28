import React, { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spin, Upload, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

import { authAPI, docsAPI } from "../api";
import { DocsType } from "../redux/user/types";
import { NotificationType } from "../types/types";
import { changeMenuItem } from "../redux/sider/siderSlice";
import { useAppDispatch } from "../redux/hooks";

const { Dragger } = Upload;

const CreateDoc: React.FC = () => {
  useEffect(() => {
    document.title = "Добавление документа | ТопДомДок";
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<DocsType>({
    name: "",
    files: null,
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const props: UploadProps = {
    name: "files",
    multiple: true,
    onChange(info) {
      setFormData({ ...formData, files: info.fileList });
    },
    onDrop(e) {
      console.log("Загруженные файлы", e.dataTransfer.files);
    },
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    name: string,
    text: string
  ) => {
    api[type]({
      message: name,
      description: text,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.files) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append("files[]", formData.files[i].originFileObj as File);
      }

      try {
        setLoading(true);
        await authAPI.getToken();
        const response = await docsAPI.sendDocs(data);
        if (response.success === false) {
          setLoading(false);
          setError(response.message);
          openNotificationWithIcon("error", "Ошибка", response.message);
          return;
        }
        setLoading(false);
        setError(null);
        dispatch(changeMenuItem(["2"]));
        navigate("/documents");
      } catch (error: unknown) {
        setLoading(false);
        setError((error as Record<string, string>).message);
        openNotificationWithIcon(
          "error",
          "Ошибка",
          (error as Record<string, string>).message
        );
      }
    } else {
      setError('Загрузите хотя бы один файл.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  if (loading) {
    return <Spin size="large" spinning={loading} fullscreen />;
  }

  return (
    <section className="container mx-auto py-4">
      {contextHolder}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Загрузка документа
      </h2>

      <div className="flex flex-center mx-auto">
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-8 shadow-md text-center"
        >
          {/* <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover"
              src="https://cdn-icons-png.flaticon.com/512/3375/3375199.png"
              alt="Документы"
            />
          </div> */}
          <label htmlFor="name" className="block">
            <input
              onChange={handleChange}
              id="name"
              type="text"
              className="block w-full mb-2 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Название"
              multiple
              required
            />
          </label>
          <Dragger beforeUpload={() => false} {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Нажмите или перетащите файлы в эту область для загрузки
            </p>
          </Dragger>

          <button
            type="submit"
            className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Загрузить
          </button>
        </form>
      </div>
      {error && (
        <Alert
          className="mx-auto w-[30%] text-center"
          message={error}
          type="error"
        />
      )}
    </section>
  );
};

export default CreateDoc;
