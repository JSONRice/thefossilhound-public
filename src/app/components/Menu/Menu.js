import React, { Component } from "react";
import styled from "styled-components";
import { Item } from "./Item";
import { ResponsiveMenu } from "./ResponsiveMenu";
import MediaQuery from "../MediaQuery/MediaQuery";
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
        label: "Index Lookup",
        link: "/collections"
      },
      {
        label: "Sharks and Rays",
        link: "/collections/chondrichthyes"
      },
      {
        label: "Trilobites",
        link: "/collections/trilobita"
      },
      {
        label: "Crabs",
        link: "/collections/malacostraca"
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
      items: MENU_DATA,
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
    if (nextProps.items && prevState.items) {
      if (nextProps.items.length !== prevState.items.length) {
        return {
          ...prevState,
          items: nextProps.items
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
    const { activeItem, items, openItem } = this.state;

    return (
      <div ref={node => (this.node = node)}>
        <MediaQuery
          media={tabletBreakPoint}
          render={({ matches }) => (
            <>
              {matches ? (
                <Nav>
                  {items &&
                  items.length > 0 &&
                  items.map(item => (
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
              ) : (
                <ResponsiveMenu items={items} />
              )}
            </>
          )}
        />
      </div>
    );
  }
}
