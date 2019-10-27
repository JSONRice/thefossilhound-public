import React from "react";
import { Accordion } from "../Accordion";
import styled from "styled-components";
import { LocalLink } from "../LocalLink";
import { Icon } from "../Icon";
import PropTypes from "prop-types";

const ResponsiveAnchor = styled.a`
  color: ${({ theme }) => theme.color.gray1300} !important;
`;

const ResponsiveLocalLink = styled(LocalLink)`
  color: ${({ theme }) => theme.color.gray1300};
`;

const Container = styled.div`
  padding: 15px 10px;
`;

const LinkContainer = styled.div`
  color: ${({ theme }) => theme.color.black700};
  ${({ theme }) => theme.fontSize(14)};
`;

const StyledResponsiveMenu = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.color.gray1100};
`;

const AccordionItem = styled.div`
  padding: 10px 15px 10px 25px;
  background-color: ${({ theme }) => theme.color.white1200} !important;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray500};
  ${props => ({ theme }) => theme.fontSize(props.fontSize)};
`;

const LabelOnlyContainer = styled.div`
  padding: 10px 15px 10px 10px;
`;

function resolveLink(href, children) {
  if (href && href.startsWith("/")) {
    return <ResponsiveLocalLink href={href}>{children}</ResponsiveLocalLink>;
  } else {
    return <ResponsiveAnchor href={href}>{children}</ResponsiveAnchor>;
  }
}

const ConditionalLink = ({ href, children }) => (href ? resolveLink(href, children) : children);

export class ResponsiveMenu extends React.Component {
  state = { closed: true };

  render() {
    const {
      state: { closed },
      props: { items }
    } = this;

    return (
      <StyledResponsiveMenu>
        <Icon name="menuHamburger" fontSize={18} color="#3c4d71" onClick={() => this.setState({ closed: !closed })} />
        {!closed && (
          <Container>
            {items.map(i => {
              return i.label === "Home" ? (
                <Accordion
                  iconName="home"
                  iconColor="#777"
                  iconSize={14}
                  hasIcon={true}
                  key={`accordion-key-label-${i.label}`}
                >
                  {i.dropdown.map(item => (
                    <AccordionItem
                      key={`link-key-label-${item.label}`}
                      onClick={() => this.setState({ closed: !closed })}
                    >
                      <ConditionalLink href={item.link && item.link}>{item.label}</ConditionalLink>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : i.dropdown ? (
                <Accordion label={i.label} key={`accordion-key-label-${i.label}`}>
                  {i.dropdown.map(item => (
                    <AccordionItem
                      key={`link-key-label-${item.label}`}
                      onClick={() => this.setState({ closed: !closed })}
                    >
                      <ConditionalLink href={item.link && item.link}>
                        <LinkContainer>{item.label}</LinkContainer>
                      </ConditionalLink>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <LabelOnlyContainer
                  key={`link-key-label-${i.label}`}
                  onClick={() => this.setState({ closed: !closed })}
                >
                  <ConditionalLink href={i.link && i.link}>
                    <LinkContainer>{i.label}</LinkContainer>
                  </ConditionalLink>
                </LabelOnlyContainer>
              );
            })}
          </Container>
        )}
      </StyledResponsiveMenu>
    );
  }
}

ResponsiveMenu.propTypes = {
  items: PropTypes.array
};

ResponsiveMenu.defaultProps = {
  items: []
};
