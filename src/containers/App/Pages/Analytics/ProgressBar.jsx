import React from 'react';
import { Progress } from 'antd';

const contentFormat = percent => `${percent}%`;

const strokeColor = {
  '0%': '#108ee9',
};

const ProgressBar = () => <Progress strokeColor={strokeColor} percent={78} status="active" format={contentFormat} />;

export default ProgressBar;
