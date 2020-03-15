import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, PageHeader } from 'antd';
import { connect } from 'react-redux';
import FacultyComparisonGraph from './FacultyComparisonGraph';
import FacultyGraph from './FacultyGraph';

class AnalyticsCard extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.setSelectedFaculty = this.setSelectedFaculty.bind(this);
  }

  state = { selectedFaculty: undefined }

  setSelectedFaculty(selectedFaculty) {
    this.setState({ selectedFaculty });
  }

  render() {
    const { departmentCode, classCode } = this.props;

    const cardTitle = this.state.selectedFaculty
      ?
        <PageHeader onBack={() => this.setSelectedFaculty(undefined)} title={this.state.selectedFaculty.name} />
      :
        <PageHeader title="Faculty Comparison" />;

    return (
      <Fragment>
        <Card title={cardTitle} extra={<b>Action</b>}>
          {
            this.state.selectedFaculty
              ?
                <FacultyGraph departmentCode={departmentCode} classCode={classCode} />
              :
                <FacultyComparisonGraph departmentCode={departmentCode} classCode={classCode} setSelectedFaculty={this.setSelectedFaculty} />
          }
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsCard);
