import React, { Component } from 'react';
import { Modal, Tabs, Checkbox } from 'antd';
import PropTypes, { string } from 'prop-types';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';

const { TabPane } = Tabs;

class LinkFacultyToSubjectModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    selectedSubject: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parameters: PropTypes.arrayOf(string).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onParameterWiseFacultyCheckboxChangeEvent = this.onParameterWiseFacultyCheckboxChange.bind(this);
  }

  state = { isParameterWiseDifferentFaculty: false };

  onParameterWiseFacultyCheckboxChange(event) {
    const isParameterWiseDifferentFaculty = event.target.checked;
    this.setState({ isParameterWiseDifferentFaculty });
  }

  render() {
    const {
      visible, onCancel, onCreate, selectedSubject = { parameters: [] },
    } = this.props;

    return (
      <Modal
        title="Link Faculty to Subject"
        okText="Submit"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
      >
        {
          selectedSubject.parameters.length > 1 &&
          <Checkbox onChange={this.onParameterWiseFacultyCheckboxChangeEvent}>Parameter-wise different faculty</Checkbox>
        }
        <Tabs size="small">
          {
           this.state.isParameterWiseDifferentFaculty ?
            selectedSubject.parameters.map(parameter => (
              <TabPane tab={transformKeyToLabel(parameter, { array: subjectParameters })} key={parameter}>
                {parameter}
              </TabPane>
            ))
           :
            <TabPane tab={selectedSubject.parameters.map(parameter => transformKeyToLabel(parameter, { array: subjectParameters })).join('/')} key="All">
              TTTTTT
            </TabPane>
          }
        </Tabs>
      </Modal>
    );
  }
}

export default LinkFacultyToSubjectModal;
