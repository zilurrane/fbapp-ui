import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

export const ActiveStatus = ({ isActive }) => (
  isActive
    ?
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    :
      <CloseCircleTwoTone twoToneColor="#eb2f96" />
);

ActiveStatus.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
