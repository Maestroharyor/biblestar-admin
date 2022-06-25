import {notification} from 'antd';

export const userNotificationSuccess = (message, description) => {
    notification.success({
      message,
      description
    });
  };


export const userNotificationFailure = (message, description) => {
    notification.warning({
      message,
      description
    });
  };