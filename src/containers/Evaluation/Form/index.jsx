import React from 'react';
import { Row, Col, Divider, Layout } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedbackFormHeader from './FeedbackFormHeader';
import FeedbackFormBody from './FeedbackFormBody';
import { logOutUser } from '../../../redux/actions/authActions';

const { Content, Footer } = Layout;

const FeedbackFormPage = ({ loggedInUserInfo, logOutUserAction }) => (
  <Layout className="layout">
    <Content>
      <Row className="account">
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 16, offset: 4 }} className="account__wrapper">
          <div className="account__card evaluation__form__card">
            <FeedbackFormHeader userName={loggedInUserInfo.userName} logOutUserAction={logOutUserAction} />
            <Divider />
            <FeedbackFormBody loggedInUserInfo={loggedInUserInfo} />
          </div>
        </Col>
      </Row>
    </Content>
    <Footer style={{ textAlign: 'center' }}><b>Made with <span role="img" aria-label="love">&#128150;</span> in India by LifeCOMPILERS</b></Footer>
  </Layout>
);

FeedbackFormPage.propTypes = {
  loggedInUserInfo: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
  }).isRequired,
  logOutUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ loggedInUserInfo: state.auth.loggedInUserInfo });
const mapDispatchToProps = { logOutUserAction: logOutUser };
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormPage);
