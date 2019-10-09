import React from "react";
import { storiesOf } from "@storybook/react";

import groupBy from "lodash-es/groupBy";

import * as themeColors from "./theme-colors";
import * as themeFontSizes from "./theme-font-sizes";
import * as themeIcons from "./theme-icons";

import styled from "styled-components";
import { Icon } from "../components/Icon";
import theme from "./theme";

// region Private Constants

const THEME_COLOR_NAME_GROUPS = groupBy(
  Object.keys(themeColors).filter(colorName => typeof themeColors[colorName] !== "function"),
  colorName => colorName.match(/^[^\d]+/)[0]
);

const THEME_FONT_SIZES = Object.keys(themeFontSizes)
  .filter(fontSizeName => !fontSizeName.endsWith("LineHeight"))
  .map(fontSizeName => {
    let match = fontSizeName.match(/\d{1,3}$/);
    return Number(match[0]);
  });

const THEME_ICON_GROUPS = groupBy(
  Object.keys(themeIcons).filter(iconName => typeof themeIcons[iconName] !== "function"),
  iconName => iconName.match(/^[^\d]+/)[0]
);

// endregion

// region Styled Components

const StyledColorPaletteWrapper = styled.div`
  height: 100vh;
  margin: 15px;
  padding: 15px;
  overflow-y: auto;

  & > * {
    --linear-layout-item-gap: 30px;
  }
`;

const StyledColorRow = styled.div`
  width: 100%;
  padding: 10px;
  color: #000;
  font-family: monospace;
  font-size: 1.25em;
  line-height: 1.3em;
  background: ${({ colorName }) => themeColors[colorName]};
`;

const StyledColorInfo = styled.span`
  margin: -5px;
  padding: 5px;
  background: #ffffff80;
  border-radius: 5px;
`;

const StyledColorName = styled.span`
  font-weight: 700;
`;

const StyledColorValue = styled.span`
  margin-left: 20px;
  color: #666;
`;

const StyledTableHeader = styled.th`
  background: #ccc;
  color: #000;
  font-family: sans-serif;
  font-weight: 500;
  font-size: 1em;
  text-align: center;
  padding: 10px;
  border: 1px solid #aaa;
`;

const StyledFontSizesWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 15px;
  padding: 15px;
  overflow: auto;
`;

const StyledIconsWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 15px;
  padding: 15px;
  overflow: auto;
`;

const StyledTable = styled.table`
  border: 1px solid #aaa;
  border-collapse: collapse;
`;

const StyledRow = styled.tr`
  border: 1px solid #aaa;
`;

const StyledFontSizeNameCell = styled.td`
  padding: 10px;
  color: #000;
  font-weight: 600;
  text-align: center;
  border: 1px solid #aaa;
`;

const StyledIconNameCell = styled.td`
  padding: 10px;
  color: #000;
  font-weight: 600;
  text-align: center;
  border: 1px solid #aaa;
`;

const StyledIconCodeCell = styled.td`
  padding: 10px;
  color: #000;
  font-family: monospace;
  font-weight: 600;
  text-align: center;
  border: 1px solid #aaa;
`;

const StyledFontSizeExample = styled.td`
  padding: 10px;
  ${({ fontSize }) => theme.fontSize(fontSize)};
  color: #000;
  text-align: center;
  border: 1px solid #aaa;
`;

const StyledFontSizeValue = styled.td`
  padding: 10px;
  color: #555;
  font-family: monospace;
  text-align: center;
  border: 1px solid #aaa;
`;

const StyledIconValue = styled.td`
  padding: 10px;
  color: #555;
  text-align: center;
  border: 1px solid #aaa;
`;

// endregion

//

storiesOf("Theme", module)
  .add("Color Palette", () => (
    <StyledColorPaletteWrapper>
      {Object.keys(THEME_COLOR_NAME_GROUPS).map(groupName => (
        <div key={groupName}>
          {THEME_COLOR_NAME_GROUPS[groupName].map(colorName => (
            <StyledColorRow colorName={colorName} key={colorName}>
              <StyledColorInfo>
                <StyledColorName>{colorName}</StyledColorName>
                <StyledColorValue>{themeColors[colorName]}</StyledColorValue>
              </StyledColorInfo>
            </StyledColorRow>
          ))}
        </div>
      ))}
    </StyledColorPaletteWrapper>
  ))
  .add("Icons", () => (
    <StyledIconsWrapper>
      <div style={{ padding: "10px" }}>
        <b>*</b> If you see an icon that is a hollow box in Chrome that's an indication that the encoding is not found
        in the font pack and probably comes from Gideon rather than Glyphicon halflings (Bootstrap). Simply set the Icon
        component fontFamily prop within this storybook to "fontFamilyGideon" and you should be able to see the Gideon
        icons.
      </div>
      <StyledTable className="__sb-table__">
        <thead>
          <StyledRow>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Encoding</StyledTableHeader>
            <StyledTableHeader>Example</StyledTableHeader>
          </StyledRow>
        </thead>
        <tbody>
          {Object.keys(THEME_ICON_GROUPS).map(groupName => (
            <React.Fragment key={groupName}>
              {THEME_ICON_GROUPS[groupName].map(iconName => (
                <StyledRow key={iconName}>
                  <StyledIconNameCell>{iconName}</StyledIconNameCell>
                  <StyledIconValue>{themeIcons[iconName]}</StyledIconValue>
                  <StyledIconCodeCell>
                    <Icon name={iconName} />
                  </StyledIconCodeCell>
                </StyledRow>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </StyledTable>
    </StyledIconsWrapper>
  ))
  .add("Font Sizes", () => (
    <StyledFontSizesWrapper>
      <StyledTable className="__sb-table__">
        <thead>
          <StyledRow>
            <StyledTableHeader>Theme Size</StyledTableHeader>
            <StyledTableHeader>Example</StyledTableHeader>
            <StyledTableHeader>Font Size</StyledTableHeader>
            <StyledTableHeader>Line Height</StyledTableHeader>
          </StyledRow>
        </thead>
        <tbody>
          {THEME_FONT_SIZES.map(fontSize => (
            <StyledRow key={fontSize}>
              <StyledFontSizeNameCell>{fontSize}</StyledFontSizeNameCell>
              <StyledFontSizeExample fontSize={fontSize}>Aa</StyledFontSizeExample>
              <StyledFontSizeValue>{themeFontSizes[`fontSize${fontSize}`]}</StyledFontSizeValue>
              <StyledFontSizeValue>{themeFontSizes[`fontSize${fontSize}LineHeight`]}</StyledFontSizeValue>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledFontSizesWrapper>
  ));
