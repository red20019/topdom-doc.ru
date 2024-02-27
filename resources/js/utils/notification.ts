import { NotificationInstance } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotificationWithIcon = (
  api: NotificationInstance,
  type: NotificationType,
  name: string,
  text: string
) => {
  api[type]({
    message: name,
    description: text,
  });
};
