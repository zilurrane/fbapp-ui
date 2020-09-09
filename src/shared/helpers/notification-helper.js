import { notification } from 'antd';

export const openNotification = (
  type,
  message,
  description,
  duration = 450,
) => {
  notification.open({
    type,
    message,
    description,
    duration,
    key
  });
};
