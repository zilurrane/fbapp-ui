import { notification } from 'antd';

export const openNotification = (
  type,
  message,
  description,
) => {
  notification.open({
    type,
    message,
    description,
  });
};
