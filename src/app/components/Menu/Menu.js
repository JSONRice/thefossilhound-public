import React, { Component } from "react";
import styled from "styled-components";
import { Item } from "./Item";
import { ResponsiveMenu } from "./ResponsiveMenu";

const MENU_DATA = [
  {
    label: "Collections",
    feature: "COLLECTIONS",
    dropdown: [
      {
        label: "Sharks and Rays",
        link: "/collections/chondrichthyes"
      },
      {
        label: "Trilobites",
        link: "/collections/trilobita"
      }
    ]
  },
  {
    label: "Extras",
    link: "/qa-playground"
  }
];

const Nav = styled.nav`
  display: flex;
  background-color: ${({ theme }) => theme.color.gray1100};
  line-height: 12px;
  min-height: 42px;
  padding: 0 35px;
`;

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: props.activeItem || "",
      openItem: "",
      menuData: MENU_DATA,
      isMobile: false,
      isTablet: false,
      toggleHamburger: true
    };
  }

  _calcWindowDimensions = () => {
    let isMobile = false;
    let isTablet = false;

    // Check if width is zero. If so we're on an iOS device and roll back to use window.innerWidth
    let width = window.outerWidth === 0 ? window.innerWidth : window.outerWidth;

    // Mobile
    if (width < 767) {
      isMobile = true;
    }

    // Tablet (adjusted for the menu in landscape mode on a tablet)
    if (width >= 767 && width <= 1024) {
      isTablet = true;
    }

    return { isMobile, isTablet };
  };

  handleResize = () => {
    let { isMobile, isTablet } = this._calcWindowDimensions();
    this.setState({ isMobile, isTablet });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    document.addEventListener("mousedown", this.handleClickOutside, false);

    let { isMobile, isTablet } = this._calcWindowDimensions();

    this.setState({ isMobile, isTablet });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("mousedown", this.handleClickOutside, false);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.menuData && prevState.menuData) {
      if (nextProps.menuData.length !== prevState.menuData.length) {
        return {
          ...prevState,
          menuData: nextProps.menuData
        };
      }
    }
    return null;
  }

  toggleMenu = key => {
    this.setState(prevState => ({
      openItem: key === prevState.openItem ? "" : key
    }));
  };

  handleClickOutside = e => !this.node.contains(e.target) && this.setState({ openItem: "" });

  render() {
    const { activeItem, isMobile, isTablet, menuData, openItem } = this.state;

    return (
      <div ref={node => (this.node = node)}>
        {isMobile || isTablet ? (
          <ResponsiveMenu items={menuData} />
        ) : (
          <Nav>
            {menuData &&
              menuData.length > 0 &&
              menuData.map(i => (
                <Item
                  active={i.label === activeItem}
                  entries={i.dropdown}
                  key={i.label}
                  label={i.label}
                  link={i.link}
                  onBlur={() => this.toggleMenu()}
                  onClick={() => this.toggleMenu(i.label)}
                  open={i.label === openItem}
                />
              ))}
          </Nav>
        )}
      </div>
    );
  }
}
