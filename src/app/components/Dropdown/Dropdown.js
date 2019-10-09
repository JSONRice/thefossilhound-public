import React from "react";
import styled from "styled-components";

// The opacity of th box shadow of 0.075 is not possibly to completely capture with a hex code so allow it here.
// Use theme wherever possible.
const Select = styled.select`
  background-color: #fff;
  border: 1px solid #ccc;
  height: 29px;
  ${({ theme }) => theme.fontSize(11)};

  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  // Covers mobile and tablet
  @media (min-width: 992px) {
    width: auto !important;
  }

  // Covers non-responsive (anything greater than mobile or tablet)
  @media (max-width: 991px) {
    width: 100%;
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.blue1700};
    box-shadow: 0 inset 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px ${({ theme }) => theme.color.green1300};
  }

  margin-left: ${props => props.indent};
`;

const Option = styled.option`
  font-weight: normal;
  display: block;
  white-space: pre;
  min-height: 1.2em;
  padding: 0 2px 1px;
`;

const DEFAULT_PLACEHOLDER = "--";
const DEFAULT_VALUE = "";

/**
 * Dropdown component that if given a callback will provide the last selected option value.
 */
export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || DEFAULT_VALUE,
      selected: ""
    };
  }

  // TODO: Refactor - this should really be it's very own component
  _renderOptions = (data, excludePlaceholder, placeholder) => {
    let options = data
      .filter(d => d.value)
      .map((d, i) => {
        return (
          <Option key={`dropdown-key-${i}`} value={d.key}>
            {d.value}
          </Option>
        );
      });

    if (placeholder && !excludePlaceholder) {
      options.unshift(
        <Option key="dropdown-placeholder-key" defaultValue={DEFAULT_VALUE}>
          {placeholder}
        </Option>
      );
    }

    return options;
  };

  componentDidMount() {
    if (this.props.data && this.props.data.length > 0) {
      this.props.data.map(d => {
        if (d.active) {
          this.setState({
            value: d.value
          });
        }
      });
    }
  }

  render() {
    let {
      props: {
        data = [],
        indent,
        placeholder = DEFAULT_PLACEHOLDER,
        excludePlaceholder = false,
        onChange,
        showSingleton = false
      },
      state: { value }
    } = this;

    value = this.props.value === "" ? this.props.value : value;

    return (
      (data.length > 1 || showSingleton) && (
        <Select
          indent={indent}
          value={value}
          onChange={e => {
            const value = e.target.value;
            if (onChange) {
              value === placeholder ? onChange(DEFAULT_VALUE) : onChange(value);
            }
            this.setState({ value });
          }}
        >
          {this._renderOptions(data, excludePlaceholder, placeholder)}
        </Select>
      )
    );
  }
}
