import PropTypes from 'prop-types';

export const tenantShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
});
