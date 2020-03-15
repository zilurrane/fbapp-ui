import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { connect } from 'react-redux';
import FacultyComparisonGraph from './FacultyComparisonGraph';

class AnalyticsCard extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
  };

  render() {
    const { departmentCode, classCode } = this.props;

    return (
      <Fragment>
        <Card title="Faculty Comparison" extra={<b>Action</b>}>
          <FacultyComparisonGraph departmentCode={departmentCode} classCode={classCode} />
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsCard);
