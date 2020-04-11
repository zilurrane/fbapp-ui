import PropTypes from 'prop-types';

export const tenantShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
});

export const userShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  departmentCode: PropTypes.string.isRequired,
  classCode: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
});
