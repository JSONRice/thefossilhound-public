import * as colors from "./theme-colors";
import * as fontSizes from "./theme-font-sizes";
import * as icons from "./theme-icons";

const _determineLineHeight = (size, excludeLineHeight = false) => {
  if (!excludeLineHeight) {
    return `line-height: ${fontSizes[`fontSize${size}LineHeight`]}`;
  }
};

const theme = {
  // MediaQueries
  media: {
    mobileMax: 766,
    tabletMax: 991
  },
  // Icons
  icons: {
    ...icons
  },
  // Colors
  color: {
    ...colors,
    accent: colors.turquoise500,
    buttonText: "#ffffff",
    cancelButtonHover: "#b2b3b3",
    cancelButtonActive: "#545455",
    cancelButtonDisabled: "#dadada",
    dangerButton: "#d5534f",
    dangerButtonHover: "#e56e69",
    dangerButtonActive: "#a13d3a",
    dangerButtonDisabled: "#eba4a2",
    dangerButtonTextDisabled: "#9a3f3a",
    disabledLight: colors.gray400,
    disabled: colors.gray500,
    disabledDark: colors.gray600,
    editGroup: colors.gray400,
    editGroupDark: colors.gray500,
    editGroupText: colors.gray700,
    error: colors.redMatte200,
    errorAccent: colors.redMatte600,
    important: colors.redMatte600,
    highlight: colors.blue100,
    highlightAccent: colors.blueVibrant500,
    info: colors.blue100,
    infoAccent: colors.blueVibrant500,
    infoDark: colors.blue700,
    negative: colors.red500,
    negativeBright: colors.red500Bright,
    negativeDark: colors.red500Dark,
    neutral: colors.gray600,
    neutralDark: colors.gray600Dark,
    positive: colors.green500,
    positiveBright: colors.green500Bright,
    positiveDark: colors.green500Dark,
    primary: colors.blue500,
    primaryButton: "#fff",
    primaryButtonBackground: "#337ab7",
    primaryButtonHover: "#286090",
    primaryButtonHoverBorder: "#204d74",
    primaryButtonActive: "#2a3753",
    primaryButtonDisabled: "#0d63ba",
    primaryDark: colors.blue700,
    primaryLightlyShaded: colors.blue600,
    proxyBackground: colors.yellow1300,
    secondaryButtonBorder: colors.gray500,
    secondaryButtonHover: "#eeeeee",
    secondaryButtonHoverBackground: "#e6e6e6",
    secondaryButtonHoverBorder: "#adadad",
    severityLow: colors.greenMatte300,
    severityMedium: colors.yellow300,
    severityHigh: colors.redMatte600,
    textPrimary: colors.black700,
    textPrimaryDark: colors.black900,
    textPrimaryLight: colors.gray600,
    textSecondary: colors.white100,
    warning: colors.yellow100,
    warningAccent: colors.yellow300
  },
  // Fonts
  font: {
    fontFamilyGlyphiconsHalflings: "Glyphicons Halflings",
    fontFamilySans: "'Open Sans', 'Zoram', 'noto sans', 'Helvetica', 'Arial', sans-serif",
    fontFamilySerif: "'Palatino', 'Palatino Linotype', 'Pahoran', 'Georgia', 'Times New Roman', serif",
    fontFamilySlab: "'Helam', 'Helvetica', 'Arial', sans-serif",
    fontFamilyHelamSlab: "'Helam Slab', 'Roboto Slab', Calibri, Helvetica, Arial, sans-serif",
    fontFamilyGideonSlab: "'Gideon Slab', 'Roboto Slab', Calibri, Helvetica, Arial, sans-serif",
    fontFamilyGideon: "'Gideon', 'Roboto', Calibri, Helvetica, Arial, sans-serif",
    ...fontSizes
  },
  icon(name) {
    return `content: "${icons[`${name}`]}"`;
  },
  /**
   * @param {!Number} [size=500] - See theme-font-sizes.js
   */
  fontSize(size = 13, excludeLineHeight = false) {
    // language=SCSS prefix={ suffix=}
    return `
        font-size:   ${fontSizes[`fontSize${size}`]};
        _determineLineHeight(size, excludeLineHeight);
      `;
  },
  bannerColors(type = "info") {
    switch (type) {
      case "success":
      case "info":
      case "warning":
      case "error":
        return `
          color: ${colors[`${type}Color`]};
          background-color: ${colors[`${type}BackgroundColor`]};
          border: 1px solid ${colors[`${type}BorderColor`]};
        `;
    }
  },
  bannerIcon(type = "info") {
    switch (type) {
      case "success":
        return this.icon("successIcon");
      case "warning":
        return this.icon("warningIcon");
      case "error":
        return this.icon("errorIcon");
      case "info":
      default:
        return this.icon("infoIcon");
    }
  },
  // Defaults
  defaults: {
    borderRadius: "5px",

    border(color) {
      return `1px solid ${color}`;
    },

    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    dropShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",

    inputMargin: "10px",

    transitionDuration: "300ms",
    transitionTimingFunction: "ease-in-out"
  }
};

const INPUT_GUTTER_SIDES = "10px";
const INPUT_ICON_FONT_SIZE = "1.13043478261em"; // NOTE: 13px when base is 11.5px

Object.assign(theme, {
  app: {
    gutterTopBottom: "10px",
    gutterSides: "15px",

    bgColor: colors.white100,
    contentBgColor: colors.white100,

    mainContent: {
      gutter: "20px",
      borderWidth: "1px"
    }
  },

  //------------------------
  //------------------------

  button: {
    minHeight: "34px",
    paddingTopBottom: "0",
    paddingSides: "10px",

    borderRadius: "4px",
    borderWidth: "1px",

    icon: {
      marginRight: "5px"
    },

    small: {
      minHeight: "21px",
      paddingTopBottom: "4px",
      hasIconPaddingSides: "5px"
    }
  },

  //------------------------
  //------------------------

  buttonGroup: {
    itemMargin: "10px",
    itemMarginSmall: "5px"
  },

  //------------------------
  //------------------------

  containers: {
    margin: "24px",

    gutter100: "2.5px",
    gutter200: "5px",
    gutter300: "10px",
    gutter400: "15px",
    gutter500: "20px",

    borderColor: colors.gray400,
    borderDarkColor: colors.gray500,
    borderRadius: theme.defaults.borderRadius,

    rowOdd: colors.blue1800,
    rowEven: colors.white900,
    responsiveRowEven: colors.blue1900
  },

  //------------------------
  //------------------------

  inputs: {
    minHeight: "24px",
    fontSize: fontSizes.fontSize12,

    gutterSides: INPUT_GUTTER_SIDES,

    bgColor: colors.white100,

    borderColor: colors.gray500,
    borderRadius: "4px",

    placeholder: {
      textColor: theme.color.textPrimaryLight
    },

    icon: {
      fontSize: INPUT_ICON_FONT_SIZE,
      size: `${INPUT_GUTTER_SIDES} + ${INPUT_ICON_FONT_SIZE}`,
      textColor: colors.gray600Dark
    },

    scaled: {
      minHeight: "2.08695652174em", // NOTE: 24px when base is 11.5px
      fontSize: "0.88461538461em", // NOTE: 11.5px when base is 13px
      lineHeight: "1.30434782609em" // NOTE: 15px when base is 11.5px
    },

    disabled: {
      bgColor: theme.color.disabledLight,
      borderColor: theme.color.disabledLight,
      textColor: theme.color.disabledDark
    },

    invalid: {
      borderColor: theme.color.errorAccent
    },

    checkbox: {
      size: "1.1em"
    },

    textArea: {
      padding: "5px"
    }
  },

  //------------------------
  //------------------------

  subTable: {
    cellBorderColor: colors.gray400,
    cellPaddingSides: "10px"
  }
});

export default theme;
