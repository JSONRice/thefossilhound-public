import React, { Component } from "react";

class WindowState extends Component {
  constructor(props) {
    super(props);

    let { isMobile, isTablet } = this._calcWindowDimensions();

    this.state = {
      isMobile,
      isTablet
    };
  }

  _calcWindowDimensions = () => {
    let isMobile = false;
    let isTablet = false;

    // Check if width is zero. If so we're on an iOS device and roll back to use window.innerWidth
    let width = window.outerWidth === 0 ? window.innerWidth : window.outerWidth;

    // Mobile
    if (width < 768) {
      isMobile = true;
    }
    // Tablet
    if (width >= 768 && width <= 991) {
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
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    let { children } = this.props;
    let { isMobile, isTablet } = this.state;

    return (
      <React.Fragment>
        {children({
          isMobile,
          isTablet
        })}
      </React.Fragment>
    );
  }
}

export default WindowState;
