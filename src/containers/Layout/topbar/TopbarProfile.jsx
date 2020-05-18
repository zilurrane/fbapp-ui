import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import TopbarMenuButton from './TopbarMenuButton';

const Ava = `${process.env.PUBLIC_URL}/img/Zilu.jpg`;

export default class TopbarProfile extends PureComponent {
  static propTypes = {
    logOutUser: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">Zilu Rane</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Page one" icon="list" path="/app/one" />
            <TopbarMenuLink title="Page two" icon="inbox" path="/app/two" />
            <div className="topbar__menu-divider" />
            <TopbarMenuButton title="Log Out" icon="exit" action={this.props.logOutUser} />
          </div>
        </Collapse>
      </div>
    );
  }
}
