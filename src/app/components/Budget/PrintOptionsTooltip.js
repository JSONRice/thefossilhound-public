import React from "react";
import { Tooltip } from "../Tooltip";
import { loadBudgetSummaryPdf, loadBudgetDetailPdf } from "../../utils/pdf-utils";
import styled from "styled-components";
import { Icon } from "../Icon";
import PropTypes from "prop-types";
import { CloseButton, PrimaryButton, SecondaryButton } from "../Buttons";
import { translate } from "../../utils/translate";

const IconWrapper = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
`;

const PrintButtonIconWrapper = styled(IconWrapper)`
  padding: 5px;
  background-color: inherit;
  flex-direction: row;
  align-items: center;
`;

const PrintButton = styled(PrimaryButton)`
  display: flex;
`;

const PrintLabel = styled.div`
  padding-left: 7px;
  ${({ theme }) => theme.fontSize(20)};
`;

const SecondaryPrintButton = styled(SecondaryButton).attrs({ type: "submit" })`
  display: flex;
  border-color: ${({ theme }) => theme.color.blue800};
`;

const SecondaryPrintLabel = styled.div`
  padding-left: 7px;
  color: ${({ theme }) => theme.color.blue800};
  ${({ theme }) => theme.fontSize(13)};
`;

const Content = styled.div`
  padding: 10px 80px 10px 10px;
`;

const Title = styled(Content)`
  background-color: ${({ theme }) => theme.color.white200};
  ${({ theme }) => theme.font.fontFamilySans};
  ${({ theme }) => theme.fontSize(14)};
`;

const StyledRadio = styled.input.attrs({ type: "radio" })`
  background: ${({ theme }) => theme.color.white200};
  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 2px;
`;

const RadioWrapper = styled.div`
  margin-bottom: 10px;
`;

export class PrintOptionsTooltip extends React.Component {
  constructor(props) {
    super(props);

    // By default the print options tooltip should be hidden then once opened the main report radio button selected
    this.state = {
      handleBudgetReportRadio: true,
      handleBudgetDetailReportRadio: false,
      hidePrintOptions: true,
      hideOnClick: false
    };
  }

  _handleRadio = event => {
    const target = event.target;
    const { checked, name } = target;
    if (name === "handleBudgetReportRadio") {
      this.setState({ [name]: checked, handleBudgetDetailReportRadio: false });
    } else {
      this.setState({ [name]: checked, handleBudgetReportRadio: false });
    }
  };

  _handleSubmit = event => {
    const { handleBudgetReportRadio, handleBudgetDetailReportRadio } = this.state;
    const { beginMonth, endMonth, reportYear, orgId, subcategoryId, unitSubcategoryId } = this.props;

    if (handleBudgetReportRadio) {
      loadBudgetSummaryPdf(orgId, beginMonth, endMonth, reportYear);
    } else if (handleBudgetDetailReportRadio) {
      loadBudgetDetailPdf(orgId, beginMonth, endMonth, reportYear, subcategoryId, unitSubcategoryId);
    }

    if (!this.state.hideOnClick) {
      this.setState({ hidePrintOptions: !this.state.hidePrintOptions });
    }

    event.preventDefault();
  };

  _renderCloseButton = hideOnClick => {
    if (!hideOnClick) {
      return (
        <CloseButton
          onClick={() => {
            this.setState({ hidePrintOptions: !this.state.hidePrintOptions });
          }}
        />
      );
    }
  };

  render() {
    const { hideOnClick, hidePrintOptions } = this.state;

    return (
      <Tooltip
        hideOnClick={hideOnClick}
        hideTooltip={hidePrintOptions}
        placement="bottom-end"
        positionFixed={false}
        showOnHover={false}
        renderTooltip={() => {
          return (
            <form onSubmit={this._handleSubmit}>
              <Title>
                <span>{translate("label.print.options")}</span>
                {this._renderCloseButton(hideOnClick)}
              </Title>
              <Content>
                <RadioWrapper>
                  <StyledRadio
                    name="handleBudgetReportRadio"
                    checked={this.state.handleBudgetReportRadio}
                    onChange={this._handleRadio}
                  />{" "}
                  {translate("label.budget.summary.report")}
                </RadioWrapper>
                <RadioWrapper>
                  <StyledRadio
                    name="handleBudgetDetailReportRadio"
                    checked={this.state.handleBudgetDetailReportRadio}
                    onChange={this._handleRadio}
                  />{" "}
                  {translate("label.budget.details.report")}
                </RadioWrapper>
                <SecondaryPrintButton>
                  <PrintButtonIconWrapper>
                    <Icon color="#0091BC" fontFamily={"fontFamilyGideon"} name="print" fontSize={13} />
                    <SecondaryPrintLabel>{translate("label.print")}</SecondaryPrintLabel>
                  </PrintButtonIconWrapper>
                </SecondaryPrintButton>
              </Content>
            </form>
          );
        }}
      >
        <PrintButton
          onClick={() => {
            if (!hideOnClick) {
              this.setState({ hidePrintOptions: !this.state.hidePrintOptions });
            }
          }}
        >
          <PrintButtonIconWrapper>
            <Icon color="#ffffff" fontFamily={"fontFamilyGideon"} name="print" fontSize={20} />
            <PrintLabel>{translate("label.print")}</PrintLabel>
          </PrintButtonIconWrapper>
        </PrintButton>
      </Tooltip>
    );
  }
}

PrintOptionsTooltip.propTypes = {
  hideOnClick: PropTypes.bool,
  hidePrintOptions: PropTypes.bool
};

PrintOptionsTooltip.defaultProps = {
  hideOnClick: false,
  hidePrintOptions: true
};
