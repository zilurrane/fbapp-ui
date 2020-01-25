import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarCategory title="Theme" icon="layers">
            <button className="sidebar__link" onClick={this.props.changeToLight}>
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button className="sidebar__link" onClick={this.props.changeToDark}>
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink icon="home" title="Dashboard" route="/app/dashboard" onClick={this.hideSidebar} />
          <SidebarLink icon="user" title="Users" route="/app/users" onClick={this.hideSidebar} />
          <SidebarLink icon="list" title="Classes" route="/app/classes" onClick={this.hideSidebar} />
          <SidebarLink icon="user" title="Faculties" route="/app/faculties" onClick={this.hideSidebar} />
          <SidebarLink icon="user" title="Students" route="/app/students" onClick={this.hideSidebar} />
          <SidebarLink icon="layers" title="Backup" route="/app/backup" onClick={this.hideSidebar} />
          <SidebarLink icon="chart-bars" title="Feedback" route="/app/feedback" onClick={this.hideSidebar} />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Example Pages" icon="diamond">
            <SidebarLink title="Page one" route="/app/one" onClick={this.hideSidebar} />
            <SidebarLink title="Page two" route="/app/two" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
