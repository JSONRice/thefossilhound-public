import React from "react";
import styled from "styled-components";
import { Dropdown } from "../Dropdown";
import { PrimaryButton } from "../Buttons";
import theme from "../../styles/theme";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: ${theme.color.gray900};
  border: 1px solid ${theme.color.gray1000};
  box-sizing: border-box;
  border-radius: 6px;

  > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin: ${props => (props.noRightMargin ? "0 15px 0 0" : "0")};
`;

const Apply = styled(PrimaryButton)`
  height: 29px;
  padding: 4px 12px !important;
  ${({ theme }) => theme.fontSize(11)};
`;

/**
 * Custom Date picker
 */
class CustomDate extends React.Component {
  _filterDataIngestor(data, key) {
    // Reduce the multi-dimensional data object (map)
    return data.reduce((acc, curr) => {
      !acc[curr[key]] && (acc[curr[key]] = curr[key]);

      let lines = curr.lines.reduce((acc, curr) => {
        !acc[curr[key]] && (acc[curr[key]] = curr[key]);
        return acc;
      }, {});

      // Merge the flattened lines back into the accumulated object
      return {
        ...acc,
        ...lines
      };
    }, {});
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { data = {}, onClick = () => {} } = this.props;

    const months = [
      {
        key: 0,
        value: "January"
      },
      {
        key: "1",
        value: "February"
      },
      {
        key: "2",
        value: "March"
      },
      {
        key: "3",
        value: "April"
      },
      {
        key: "4",
        value: "May"
      },
      {
        key: "5",
        value: "June"
      },
      {
        key: "6",
        value: "July"
      },
      {
        key: "7",
        value: "August"
      },
      {
        key: "8",
        value: "September"
      },
      {
        key: "9",
        value: "October"
      },
      {
        key: "10",
        value: "November"
      },
      {
        key: "11",
        value: "December"
      }
    ];

    // TODO: get some real year data (don't mock it out):
    const years = [
      {
        key: "2019",
        value: "2019"
      },
      {
        key: "2018",
        value: "2018"
      },
      {
        key: "2017",
        value: "2017"
      },
      {
        key: "2016",
        value: "2016"
      },
      {
        key: "2015",
        value: "2015"
      }
    ];

    return (
      <Container>
        <StyledDropdown key={`custom-date-year`} data={years} placeholder={`Year`} />
        <StyledDropdown key={`custom-date-from-month`} data={months} placeholder={`From Month`} />
        <StyledDropdown key={`custom-date-to-month`} data={months} placeholder={`To Month`} />
        <Apply onClick={onClick}>Apply</Apply>
      </Container>
    );
  }
}

export default CustomDate;
