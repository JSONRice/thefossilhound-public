import React from "react";
import PropTypes from "prop-types";
import { Manager, Popper, Reference } from "react-popper";
import styled from "styled-components";
import { TooltipContainer } from "./TooltipContainer";

const ChildrenWrapper = styled.span`
  cursor: ${({ disabled }) => !disabled && "pointer"};
`;

const StyledTooltipContainer = styled(TooltipContainer)`
  z-index: ${({ positionFixed }) => (positionFixed ? "9999" : "1")};
  text-align: start;
`;

export class Tooltip extends React.Component {
  /**
   * The tooltip defaults to hidden and hideOnClick determines if the tooltip should hide itself whenever there's a
   * mouse click only if it's open (must be shown first). In some scenarios (i.e. Print Options with checkboxes) the
   * tooltip should remain open until a submit button or close icon is clicked.
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      hideTooltip: this.props.hideTooltip === undefined ? true : this.props.hideTooltip,
      hideOnClick: this.props.hideOnClick === undefined ? true : this.props.hideOnClick
    };
  }

  static propTypes = {
    hideOnClick: PropTypes.bool,
    hideTooltip: PropTypes.bool,
    onShow: PropTypes.func,
    placement: PropTypes.oneOf([
      "auto",
      "auto-start",
      "auto-end",
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end"
    ]),
    positionFixed: PropTypes.bool,
    renderTooltip: PropTypes.func.isRequired,
    showOnHover: PropTypes.bool,
    toolTipInnerRef: PropTypes.func
  };

  static defaultProps = {
    placement: "right"
  };

  componentWillUnmount() {
    this._removeListeners();
  }

  /**
   * Update state with each render (replaced UNSAFE_componentWillReceiveProps)
   *
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.hideTooltip !== undefined && nextProps.hideOnClick !== undefined) {
      if (nextProps.hideTooltip !== prevState.hideTooltip || nextProps.hideOnClick !== prevState.hideOnClick) {
        return {
          ...prevState,
          hideOnClick: nextProps.hideOnClick,
          hideTooltip: nextProps.hideTooltip
        };
      }
    }
    return null;
  }

  _onKeyUpAnywhere = e => {
    if (e.key === "Escape") {
      this._hide();
    }
  };

  _addListeners = () => {
    document.addEventListener("keyup", this._onKeyUpAnywhere);
    document.addEventListener("click", this._hide);
  };

  _removeListeners = () => {
    document.removeEventListener("keyup", this._onKeyUpAnywhere);
    document.removeEventListener("click", this._hide);
  };

  _show = () => {
    this.setState({ hideTooltip: false }, this._addListeners);
  };

  _hide = () => {
    if (this.state.hideOnClick) {
      this.setState({ hideTooltip: true }, this._removeListeners);
    }
  };

  render() {
    const {
      children,
      className,
      onShow,
      placement,
      positionFixed,
      renderTooltip,
      showOnHover,
      toolTipInnerRef
    } = this.props;

    const { hideTooltip } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <ChildrenWrapper
              {...this.props}
              innerRef={ref}
              className={className}
              onMouseOver={showOnHover ? this._show : undefined}
              onMouseLeave={showOnHover ? this._hide : undefined}
              onClick={() => this._show()}
            >
              {children}
            </ChildrenWrapper>
          )}
        </Reference>
        {!hideTooltip && (
          <Popper placement={placement} innerRef={toolTipInnerRef} positionFixed={positionFixed}>
            {({ ref, style, placement: finalPlacement, arrowProps }) => (
              <StyledTooltipContainer
                positionFixed={positionFixed}
                domRef={($el, ...restOfArgs) => {
                  if (ref != null) {
                    ref($el, ...restOfArgs);
                  }

                  if ($el != null && onShow) {
                    onShow($el);
                  }
                }}
                style={style}
                placement={finalPlacement}
                arrowProps={arrowProps}
              >
                {renderTooltip()}
              </StyledTooltipContainer>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}
