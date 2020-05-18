import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class CustomizedAxisTick extends PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    payload: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default CustomizedAxisTick;
