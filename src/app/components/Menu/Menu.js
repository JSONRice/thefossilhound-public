import React, { Component } from "react";
import styled from "styled-components";
import { Item } from "./Item";
import { ResponsiveMenu } from "./ResponsiveMenu";
import MediaQuery from "react-responsive";
import theme from "../../styles/theme";

const MENU_DATA = [
  {
    label: "Home",
    link: "/"
  },
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
      toggleHamburger: true
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
  }

  componentWillUnmount() {
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
    const { activeItem, menuData, openItem } = this.state;

    return (
      <div ref={node => (this.node = node)}>
        <MediaQuery maxDeviceWidth={theme.media.mobileMax}>
          <ResponsiveMenu items={menuData} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={theme.media.mobileMax + 1}>
          {
            <Nav>
              {menuData &&
                menuData.length > 0 &&
                menuData.map(item => (
                  <Item
                    active={item.label === activeItem}
                    entries={item.dropdown}
                    key={item.label}
                    label={item.label}
                    link={item.link}
                    onBlur={() => this.toggleMenu()}
                    onClick={() => this.toggleMenu(item.label)}
                    open={item.label === openItem}
                  />
                ))}
            </Nav>
          }
        </MediaQuery>
      </div>
    );
  }
}
