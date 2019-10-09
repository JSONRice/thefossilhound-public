import { Component } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";
import CircularProgressBar from "../ProgressBars/CircularProgressBar";
import { formatCurrencyWithSymbol, formatDate } from "../../utils/formatters";
import Amount from "../Amount/Amount";
import { Icon } from "../Icon";
import { roundPercentSpent } from "../../utils/formatters";
import { Tooltip } from "../Tooltip";

const WidgetContainer = styled.div`
  width: 400px;
  height: 140px;
  display: flex;
`;

const Divider = styled.div`
  border-left: 1px solid ${theme.color.blue1150};
  min-height: 135px;
  width: 0;
  display: flex;
`;

const CircularProgressBarWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-content: flex-start;
  padding: 2vh 2vh 2vh 0;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: ${theme.font.fontFamilySans};
  ${theme.fontSize(18)};
  padding: 2vh 0 0 2vh;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubcategoryTitle = styled.div`
  font-family: ${theme.font.fontFamilySans};
  ${theme.fontSize(12)};
  padding: 2vh 0 0 2vh;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.div`
  font-family: ${theme.font.fontFamilySans};
  ${theme.fontSize(18)};
  margin: 0px;
  text-transform: capitalize;
`;

const Date = styled.div`
  font-family: ${theme.font.fontFamilySans};
  ${theme.fontSize(12)};
  color: ${theme.color.gray600};
  width: max-content;
  line-height: 20px;
  display: flex;
  padding-left: 2vh;
`;

const Budget = styled.div`
  font-family: ${theme.font.fontFamilySans};
  ${theme.fontSize(12)};
  color: ${theme.color.gray600};
  width: max-content;
  display: flex;
  padding-left: 2vh;
`;

const InfoIconWrapper = styled.div`
  color: ${theme.color.blue800};
  padding: 2vh;
`;

const BalanceWidgetTooltip = styled.div`
  padding: 10px;
`;

class BalanceWidget extends Component {
  constructor(props) {
    super(props);
  }

  _calcPercentage = (balance, assignedBudget = 0) => {
    if (assignedBudget === 0) {
      return balance < 0 ? "!" : "--";
    }
    return roundPercentSpent(((assignedBudget - balance) / assignedBudget) * 100);
  };

  render() {
    let { date, balance, assignedBudget, currencyCode, title } = this.props;
    let defaultTitle = "label.budget" === title;

    return (
      <WidgetContainer>
        <CircularProgressBarWrapper>
          <CircularProgressBar percentage={this._calcPercentage(balance, assignedBudget)} balance={balance} />
        </CircularProgressBarWrapper>
        <Divider />
        <TextWrapper>
          {defaultTitle ? (
            <Title>{title}</Title>
          ) : (
            <SubcategoryTitle>
              {title}
              <Subtitle>Balance</Subtitle>
            </SubcategoryTitle>
          )}

          <Date>{formatDate(date)}</Date>
          <Amount
            paddingLeft="2vh"
            fontSize={28}
            amount={balance}
            showCurrencySymbol={true}
            currencyCode={currencyCode}
          />
          <Budget>
            {formatCurrencyWithSymbol(assignedBudget, currencyCode)}
          </Budget>
        </TextWrapper>
        <InfoIconWrapper>
          <Tooltip
            placement="right"
            positionFixed={true}
            showOnHover={false}
            renderTooltip={() => {
              return <BalanceWidgetTooltip>Balance Widget Info</BalanceWidgetTooltip>;
            }}
          >
            <Icon name={"infoIcon"} fontFamily={"fontFamilyGideon"} fontSize={13} />
          </Tooltip>
        </InfoIconWrapper>
      </WidgetContainer>
    );
  }
}

BalanceWidget.defaultProps = {
  currencyCode: "USD",
  balance: 0,
  assignedBudget: 0,
  title: "label.budget"
};

export default BalanceWidget;
