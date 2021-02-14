import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, PageHeader, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import FacultyComparisonGraph from './FacultyComparisonGraph';
import FacultyGraph from './FacultyGraph';
import { callUnAuthApi } from '../../../../shared/helpers/fetch-helper';

class AnalyticsCard extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    departmentName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    facultiesFeedbackSummary: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor() {
    super();
    this.setSelectedFaculty = this.setSelectedFaculty.bind(this);
  }

  state = { selectedFaculty: undefined }

  setSelectedFaculty(selectedFaculty) {
    this.setState({ selectedFaculty });
  }

  downloadFeedback = () => {
    let filename;
    const data = this.props.facultiesFeedbackSummary.map(feedback => ({ name: feedback.faculty.name, feedback: feedback.feedback.percentage }));
    const postBody = JSON.stringify({
      meta: {
        department: { code: this.props.departmentCode, name: this.props.departmentName },
        class: { code: this.props.classCode, name: this.props.className },
      },
      data,
    });
    callUnAuthApi('https://fbapp-report-api.herokuapp.com/report/faculty/feedback/comparison', { method: 'POST', body: postBody })
      .then((response) => {
        if (response.status === 200) {
          filename = response.headers.get('content-disposition');
          // eslint-disable-next-line prefer-destructuring
          filename = filename.split('filename=')[1];
          return response.blob();
        }
        return new Promise();
      })
      .then((body) => {
        saveAs(body, filename, { type: 'application/octet-stream' });
      });
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
        <Card title={cardTitle} extra={<Button onClick={() => this.downloadFeedback()} icon={<DownloadOutlined />} />}>
          {
            this.state.selectedFaculty
              ?
                <FacultyGraph
                  key={`${departmentCode}_${classCode}_${this.state.selectedFaculty.id}`}
                  departmentCode={departmentCode}
                  classCode={classCode}
                  setSelectedFaculty={this.setSelectedFaculty}
                  selectedFaculty={this.state.selectedFaculty}
                />
              :
                <FacultyComparisonGraph
                  departmentCode={departmentCode}
                  classCode={classCode}
                  setSelectedFaculty={this.setSelectedFaculty}
                />
          }
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  facultiesFeedbackSummary: ((state.feedback.facultiesFeedbackSummary[props.departmentCode] || {})[props.classCode] || []),
});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsCard);
