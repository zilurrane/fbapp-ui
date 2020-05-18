import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink icon="home" title="Dashboard" route="/app/dashboard" onClick={this.hideSidebar} />
          <SidebarLink icon="list" title="Tenants" route="/app/tenants" onClick={this.hideSidebar} />
          <SidebarLink icon="user" title="Users" route="/app/users" onClick={this.hideSidebar} />
          <SidebarLink icon="list" title="Classes" route="/app/classes" onClick={this.hideSidebar} />
          <SidebarLink icon="book" title="Subjects" route="/app/subjects" onClick={this.hideSidebar} />
          <SidebarLink icon="user" title="Faculties" route="/app/faculties" onClick={this.hideSidebar} />
          <SidebarLink icon="user" title="Students" route="/app/students" onClick={this.hideSidebar} />
          <SidebarLink icon="chart-bars" title="Analytics" route="/app/analytics" onClick={this.hideSidebar} />
          <SidebarLink icon="layers" title="Backup" route="/app/backup" onClick={this.hideSidebar} />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
