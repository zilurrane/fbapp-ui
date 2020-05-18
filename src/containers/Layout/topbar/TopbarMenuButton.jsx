import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TopbarMenuButton extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  };

  render() {
    const { title, icon, action } = this.props;

    return (
      <button className="topbar__link" onClick={action}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </button>
    );
  }
}
