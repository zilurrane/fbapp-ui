import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const AppLoaderIndicator = <LoadingOutlined spin />;

export const AppLoader = props => <div className="app-loader-parent"><Spin className="app-loader" {...props} indicator={AppLoaderIndicator} /></div>;
