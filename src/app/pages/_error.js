import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { Page } from "../components/Page";

const ErrorWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  float: left;
  padding: 10px;
`;

const Title = styled.h2`
  font-family: ${theme.font.fontFamilyHelamSlab};
  font-style: normal;
  font-weight: 200;
  color: ${theme.color.black1200};
  margin: 5px 0;
  ${theme.fontSize(16)};
  line-height: 26px;
`;

const Message = styled.p`
  margin: 0;
`;

class ErrorPage extends React.Component {
  static getInitialProps({ res, err, query }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : query.statusCode ? Number(query.statusCode) : null;
    return { statusCode };
  }

  getMessage = statusCode => {
    switch (statusCode) {
      case 401:
      case 403:
        return "No Access";
      case 404:
        return "Not Found. We apologize for any inconvenience.";
      default:
        return "Unknown error occurred. Please check logs.";
    }
  };

  getTitle = statusCode => {
    switch (statusCode) {
      case 401:
      case 403:
        return "Access Denied";
      default:
        return "Unknown error occurred. Please check logs.";
    }
  };

  render() {
    const { statusCode } = this.props;
    const title = this.getTitle(statusCode);
    const message = this.getMessage(statusCode);

    return (
      <Page includeHeader={false}>
        <ErrorWrap>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </ErrorWrap>
      </Page>
    );
  }
}

export default ErrorPage;
