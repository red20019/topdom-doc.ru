import {
  ExportOutlined,
  PaperClipOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { Card, NotificationArgsProps, Steps, notification } from "antd";
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

export type ItemProps = {
  item: DocsType;
  matchesMax1270: boolean;
  matchesMax1000: boolean;
  matchesMax790: boolean;
}

const DocItem: React.FC<ItemProps> = ({ item, matchesMax1270, matchesMax1000, matchesMax790 }) => {
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
      <div
        className={`flex items-center flex-col gap-x-8 gap-y-4 mb-6 sm:flex-row sm:gap-y-0 ${
          matchesMax790 ? "justify-center" : "justify-between"
        }`}
      >
        <Link to={`/documents/${item.id}`}>
          <h3 className="text-sm sm:text-xl">{item.document_name}</h3>
        </Link>

        <div className="flex gap-x-2 gap-y-8 min-w-[110px] text-right sm:gap-x-5">
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

      <div
        className={`flex justify-between items-start mb-3 text-center ${
          matchesMax790 && "flex-col gap-y-6 items-center text-left"
        }`}
      >
        <span>
          Создан {item.date_add}, {item.name}
        </span>

        <div className={`${matchesMax790 ? "" : "-mr-9"}`}>
          <Steps
            labelPlacement="vertical"
            direction="horizontal"
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
          matchesMax1270={matchesMax1270}
          matchesMax1000={matchesMax1000}
          matchesMax790={matchesMax790}
        />
      ) : currentUser?.role === "accountant" ? (
        <Accountant key={item.id} item={item}
        matchesMax1270={matchesMax1270}
        matchesMax1000={matchesMax1000}
        matchesMax790={matchesMax790} />
      ) : currentUser?.role === "user" ? (
        ""
      ) : (
        "Кто ты, воин?"
      )}
    </Card>
  );
};

export default DocItem;
