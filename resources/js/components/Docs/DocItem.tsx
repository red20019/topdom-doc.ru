import {
  ExportOutlined,
  PaperClipOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import {
  Card,
  NotificationArgsProps,
  Steps,
  notification
} from "antd";
import React from "react";
import { Link } from "react-router-dom";

import {
  closePopconfirm,
  togglePopconfirm,
  updateStage,
} from "../../redux/docs/docsSlice";
import { DocsType } from "../../redux/docs/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import Accountant from "./Accountant";
import Boss from "./Boss";

const cardStyle: React.CSSProperties = {
  marginTop: 6,
  width: "100%",
};

type NotificationPlacement = NotificationArgsProps["placement"];

const DocItem: React.FC<DocsType> = (item) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const { loading, confirmLoading } = useAppSelector(
    (state: RootState) => state.docs
  );

  const [api, contextHolder] = notification.useNotification();

  const stageNotification = (
    placement: NotificationPlacement,
    id: number,
    status: string
  ) => {
    api.info({
      message: `TopDomDoc`,
      description: `Документ №${id} был ${
        status === "accepted" ? "согласован" : "отклонён"
      }.`,
      placement,
    });
  };

  const handleStageClick = (id: number, status: string) => {
    dispatch(togglePopconfirm({ id, status }));
  };

  const handleOk = async (id: number, status: string) => {
    await dispatch(updateStage({ id, status }));
    dispatch(closePopconfirm(id));
    stageNotification("bottomRight", id, status);
  };

  const handleCancel = (id: number) => {
    dispatch(closePopconfirm(id));
  };

  return (
    <Card style={cardStyle} loading={loading}>
      {contextHolder}
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
        <Boss
          id={item.id}
          stage_number={item.stage_number}
          openPopOk={item.openPopOk}
          openPopCancel={item.openPopCancel}
          confirmLoading={confirmLoading}
          handleOk={handleOk}
          handleCancel={handleCancel}
          handleStageClick={handleStageClick}
        />
      ) : currentUser?.role === "accountant" ? (
        <Accountant key={item.id} {...item} />
      ) : currentUser?.role === "user" ? (
        ""
      ) : (
        "Кто ты, воин?"
      )}
    </Card>
  );
};

export default DocItem;
