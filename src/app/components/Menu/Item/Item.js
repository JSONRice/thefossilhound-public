import React from "react";
import styled from "styled-components";
import { LocalLink } from "../../LocalLink";

const StyledItem = styled.li`
  background: ${props => ({ theme }) => (props.isMenuList ? theme.color.white100 : "initial")};
  background-color: ${props => ({ theme }) => props.active && theme.color.white100};
  color: ${props => ({ theme }) => (props.active ? theme.color.black700 : "inherit")};
  float: left;
  ${props => ({ theme }) => (props.isMenuList ? theme.fontSize(12) : theme.fontSize(14))};
  list-style: none;
  position: relative;
  padding: ${props => (props.padding ? props.padding : "0")};
  &:focus {
    outline: none;
  }
`;

const MenuList = styled.ul`
  background: ${({ theme }) => theme.color.white100};
  border: 1px solid ${({ theme }) => theme.color.gray1200};
  box-shadow: 0 1px 2px ${({ theme }) => theme.color.white600};
  left: -18px;
  padding: 16px;
  position: absolute;
  &:after {
    content: "";
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: ${({ theme }) => theme.color.white100};
    left: 20%;
    position: absolute;
    top: -16px;
    transform: translateX(-50%);
    z-index: 1102;
  }
`;
const Label = styled.span`
  display: block;
  color: ${({ theme }) => theme.color.gray1300};
  cursor: pointer;
  max-height: 42px;
  line-height: 12px;
  padding-top: 15px;
  padding-bottom: 15px;
  &:hover {
    ${props => (props.isDropdownItem ? "color: #177c9c;" : "background-color: #ddd;")};
  }

  @media (min-width: 768px) {
    border-bottom: none;
    padding: 15px 15px;
    white-space: nowrap;
  }
`;

const HomeIcon = styled.img`
  max-height: 14px;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-top-color: ${({ theme }) => theme.color.gray1300};
  margin: 0 0 -2px 4px;
`;

function resolveLink(href, children) {
  if (href && href.startsWith("/")) {
    return <LocalLink href={href}>{children}</LocalLink>;
  } else {
    return <a href={href}>{children}</a>;
  }
}

function resolveDropdownLink(href, children) {
  if (href && href.startsWith("/")) {
    return (
      <LocalLink href={href}>
        <Label isDropdownItem>{children}</Label>
      </LocalLink>
    );
  } else {
    return (
      <a href={href}>
        <Label isDropdownItem>{children}</Label>
      </a>
    );
  }
}

const ConditionalLink = ({ href, children }) => (href ? resolveLink(href, children) : children);

export const Item = ({
  isMenuList,
  label,
  link,
  active = false,
  open = false,
  onClick,
  onBlur,
  entries = [],
  isTablet = false,
  isMobile = false
}) => {
  return (
    <StyledItem
      active={active}
      onClick={onClick}
      onBlur={onBlur}
      padding={isTablet || isMobile ? "5px 5px 10px 5px" : "0"}
    >
      <ConditionalLink href={link && link}>
        <Label>
          {label === "Home" ? (
            <HomeIcon alt="Home Icon" src="/icon-home.png" />
          ) : (
            <>
              {label}
              {entries && entries.length > 0 && !isTablet && !isMobile && <Arrow />}
            </>
          )}
        </Label>
      </ConditionalLink>
      {open && entries && entries.length > 0 && (
        <MenuList>
          {entries.map(entry => (
            <StyledItem {...entry} key={entry.label} isMenuList={isMenuList} isMobile={isMobile} isTablet={isTablet}>
              {resolveDropdownLink(entry.link, entry.label)}
            </StyledItem>
          ))}
        </MenuList>
      )}
    </StyledItem>
  );
};

export default Item;
