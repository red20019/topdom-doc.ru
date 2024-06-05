import { Popconfirm } from "antd";
import React from "react";

interface BossProps {
  id: number;
  stage_number: number;
  confirmLoading: boolean;
  openPopOk: boolean | undefined;
  openPopCancel: boolean | undefined;
  matchesMax1270: boolean;
  matchesMax1000: boolean;
  matchesMax790: boolean;
  handleOk: (id: number, status: string) => Promise<void>;
  handleCancel: (id: number) => void;
  handleStageClick: (id: number, status: string) => void;
}

const Boss: React.FC<BossProps> = ({
  id,
  stage_number,
  confirmLoading,
  openPopOk,
  openPopCancel,
  handleOk,
  handleCancel,
  handleStageClick,
  matchesMax1270,
  matchesMax1000,
  matchesMax790,
}) => {
  if (stage_number === 0) {
    return (
      <div
        className={`flex gap-x-3 ${
          matchesMax790
            ? "justify-center mt-7 flex-col gap-y-3"
            : "justify-end flex-row gap-y-0"
        }`}
      >
        <Popconfirm
          title="Подтвердите действие"
          description="Вы действительно хотите согласовать этот документ?"
          open={openPopOk}
          onConfirm={() => handleOk(id, "accepted")}
          okButtonProps={{
            loading: confirmLoading,
            type: "primary",
            style: { backgroundColor: "#1677ff", color: "white" },
          }}
          onCancel={() => handleCancel(id)}
        >
          <button
            onClick={() => handleStageClick(id, "accepted")}
            className="px-5 py-2 bg-green-700 rounded hover:bg-green-600 transition-colors font-normal text-white"
          >
            Согласовать
          </button>
        </Popconfirm>
        <Popconfirm
          title="Подтвердите действие"
          description="Вы действительно хотите отклонить этот документ?"
          open={openPopCancel}
          onConfirm={() => handleOk(id, "rejected")}
          okButtonProps={{
            loading: confirmLoading,
            type: "primary",
            style: { backgroundColor: "#1677ff", color: "white" },
          }}
          onCancel={() => handleCancel(id)}
        >
          <button
            onClick={() => handleStageClick(id, "rejected")}
            className="px-5 py-2 bg-red-700 rounded hover:bg-red-600 transition-colors font-normal text-white"
          >
            Отклонить
          </button>
        </Popconfirm>
      </div>
    );
  }
  return '';
};

export default Boss;
