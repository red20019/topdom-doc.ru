import React from "react";
import { Popconfirm } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

type BossDocProps = {
  id: string;
  stage: number;
  openPopOk: boolean | undefined;
  openPopCancel: boolean | undefined;
  confirmLoading: boolean;
  handleOk: (id: number, status: string) => Promise<void>;
  handleCancel: (id: number) => void;
  handleStageClick: (id: number, status: string) => void;
};

const Boss: React.FC<BossDocProps> = (props) => {
  return (
    props.stage === 0 && (
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-end gap-x-3 pt-3">
        <StyleProvider hashPriority="high">
          <Popconfirm
            title="Подтвердите действие"
            description="Вы действительно хотите согласовать этот документ?"
            open={props.openPopOk}
            onConfirm={() => props.handleOk(+props.id, "accepted")}
            okButtonProps={{ loading: props.confirmLoading, type: "primary" }}
            onCancel={() => props.handleCancel(+props.id)}
          >
            <button
              onClick={() => props.handleStageClick(+props.id, "accepted")}
              className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
            >
              Согласовать
            </button>
          </Popconfirm>
          <Popconfirm
            title="Подтвердите действие"
            description="Вы действительно хотите отклонить этот документ?"
            open={props.openPopCancel}
            onConfirm={() => props.handleOk(+props.id, "rejected")}
            okButtonProps={{ loading: props.confirmLoading }}
            onCancel={() => props.handleCancel(+props.id)}
          >
            <button
              onClick={() => props.handleStageClick(+props.id, "rejected")}
              className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
            >
              Отклонить
            </button>
          </Popconfirm>
        </StyleProvider>
      </div>
    )
  );
};

export default Boss;
