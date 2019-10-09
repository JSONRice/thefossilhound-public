import React from "react";
import styled from "styled-components";
import { SecondaryButton } from "../Buttons";
import PropTypes from "prop-types";

const CurrentYear = styled(SecondaryButton)`
  height: 29px;
  padding: 4px 12px !important;
  ${({ theme }) => theme.fontSize(11)};
  border-right: 0 solid;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const PreviousYear = styled(SecondaryButton)`
  height: 29px;
  padding: 4px 12px !important;
  ${({ theme }) => theme.fontSize(11)};
  border-radius: 0;
`;

const CustomDate = styled(SecondaryButton)`
  height: 29px;
  padding: 4px 12px !important;
  ${({ theme }) => theme.fontSize(11)};
  border-left: 0 solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const DateButtons = ({ active, onClick }) => {
  return (
    <section>
      <CurrentYear active={active === "current"} onClick={() => onClick("current")} size={"small"}>
        Current Year
      </CurrentYear>
      <PreviousYear active={active === "previous"} onClick={() => onClick("previous")} size={"small"}>
        Previous Year
      </PreviousYear>
      <CustomDate active={active === "custom"} onClick={() => onClick("custom")} size={"small"}>
        Custom Date
      </CustomDate>
    </section>
  );
};

DateButtons.propTypes = {
  active: PropTypes.oneOf(["current", "previous", "custom"]).isRequired,
  onClick: PropTypes.func
};

DateButtons.defaultProps = {
  active: "current"
};
