import React from 'react';
import PropTypes from 'prop-types';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const getUserMenu = logOutUserAction => (
  <Menu>
    <Menu.Item key="1">
      <UserOutlined />
      Change Password
    </Menu.Item>
    <Menu.Item key="2" onClick={logOutUserAction}>
      <PoweroffOutlined />
      Log Out
    </Menu.Item>
  </Menu>
);

const FeedbackFormHeader = ({ userName, logOutUserAction }) => (
  <div className="account__head">
    <h3 className="account__title">
      Hi {userName}, Welcome to
      <span className="account__logo"> Fb<span className="account__logo-accent">App</span>
      </span>
    </h3>
    <h4 className="account__subhead subhead">Feedback Analytics that matters!!!</h4>
    <Dropdown.Button type="link" overlay={getUserMenu(logOutUserAction)} className="float-right" trigger={['click']} icon={<UserOutlined />}>
      {userName}
    </Dropdown.Button>
  </div>);

FeedbackFormHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  logOutUserAction: PropTypes.func.isRequired,
};

export default FeedbackFormHeader;
