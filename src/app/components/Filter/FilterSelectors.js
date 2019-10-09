import { Dropdown } from "../Dropdown";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { extractFilterOptions } from "../../utils/filter-utils";

const StyledDropdown = styled(Dropdown)`
  padding: 4px 12px;
`;

/**
 * Render all of the dropdown filters
 *
 * @param filters list to render dropdown filters from
 * @param data to derive dropdown filters from
 * @param filterFunc callback
 * @constructor
 */
export class FilterSelectors extends React.Component {
  render() {
    let { filters, data, filter } = this.props;

    let selectors = filters.map((f, i) => (
      <StyledDropdown
        callback={value => {
          if (filter) {
            if (value === f.placeholder) {
              filter("", f.key);
            } else {
              filter(value, f.key);
            }
          }
        }}
        key={`filter-bar-key-${i}`}
        placeholder={f.placeholder}
        data={Object.keys(extractFilterOptions(data, f.key)).map((o, index) => {
          if (f.key) {
            return { key: index, value: o };
          }
        })}
      />
    ));

    return selectors;
  }
}

FilterSelectors.propTypes = {
  filters: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired
};
