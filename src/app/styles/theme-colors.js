import { darken as polishedDarken, saturate, shade } from "polished";

// Hex opacity values for reference (see white800)
//
// 100% — FF
// 95% — F2
// 90% — E6
// 85% — D9
// 80% — CC
// 75% — BF
// 70% — B3
// 65% — A6
// 60% — 99
// 55% — 8C
// 50% — 80
// 45% — 73
// 40% — 66
// 35% — 59
// 30% — 4D
// 25% — 40
// 20% — 33
// 15% — 26
// 10% — 1A
// 5% — 0D
// 0% — 00
////

export const white100 = "#fff"; /* NAME: "Whitey White" */
export const white200 = "#f7f7f7"; /* NAME: "Not Quite White" */
export const white300 = "#fff";
export const white400 = "#999";
export const white500 = "#f5f5f5";
export const white600 = "#ddd";
export const white700 = "#eee";
export const white800 = "#a1c3cf33"; // Last hex code of 33 correlates to opacity of 20%
export const white900 = "#e7e7e7";
export const white1000 = "#ccc";
export const white1100 = "#e5e5e5";
export const white1200 = "#f4f4f4";

//------------------------

export const black700 = "#333"; /* NAME: "Mostly Black Text" */
export const black900 = "#000"; /* NAME: "Blackey Black Text" */
export const black1000 = "#555";

//------------------------

export const gray100 = "#f0f0f0";
export const gray400 = "#e5e5e5"; /* NAME: "Kinda Grey" */
export const gray450 = "#e5e3db";
export const gray500 = "#ccc"; /* NAME: "Grey" */
export const gray550 = "#bebebe";
export const gray600 = "#8c8d8e"; /* NAME: "Dark Grey" */
export const gray600Dark = darken(gray600);
export const gray700 = "#616266"; /* NAME: "Cool Dark Grey" */
export const gray750 = "#4d4d55";
export const gray800 = "#53575b";
export const gray900 = "#e6e6e6";
export const gray1000 = "#999999";
export const gray1100 = "#e9e9e9";
export const gray1200 = "#ededed";
export const gray1300 = "#4c4c4e";
export const gray1400 = "#777";
export const gray1500 = "#c4c4c4";
export const gray1600 = "#9d9d9d";
//------------------------

export const red500 = "#fc4338"; /* NAME: "Danger Will Robinson" */
export const red600 = "#ebccd1";
export const red700 = "#cc0000";
export const red800 = "#d9534f";
export const red900 = "#a94442";
export const red1000 = "#f2dede";
export const red1100 = "#921d1d";
export const red1200 = "#ea0909";

export const red500Bright = brighten(red500);
export const red500Dark = darken(red500);

export const redMatte200 = "#f2dede";
export const redMatte300 = "#eed3d7";
export const redMatte600 = "#d2705a"; /* NAME: "Sauron's Eye" */

export const redDull500 = "#a94442";

//------------------------

export const green500 = "#5cb85c"; /* NAME: "Success Green" */
export const green500Bright = brighten(green500);
export const green500Dark = darken(green500);
export const green800 = "#417505"; /* NAME: "Green Crayon" */
export const green900 = "#393";
export const green1000 = "#3c763d";
export const green1100 = "#dff0d8";
export const green1200 = "#a6c1a6";
export const green1300 = "#66AF8599";

export const greenMatte300 = "#cceaaf";

//------------------------

export const blue100 = "#dff5ff"; /* NAME: "Blue Highlighter" */
export const blue400 = "#9bd"; /* NAME: "Inactive Button Blue" */
export const blue500 = "#5381ac"; /* NAME: "Header Blue" */
export const blue600 = "#3c729f";
export const blue700 = "#125687"; /* NAME: "Header Selected" */
export const blue800 = "#0091bc";
export const blue900 = "#337ab7";
export const blue1000 = "#2e6da4";
export const blue1100 = "#d9edf7";
export const blue1150 = "#d9e9f9";
export const blue1200 = "#bce8f1";
export const blue1300 = "#31708f";
export const blue1400 = "#006696";
export const blue1500 = "#dbeaef";
export const blue1600 = "#b5cfd6";
export const blue1650 = "#7cb5ec";
export const blue1700 = "#66afe9";
export const blue1800 = "#3c4d71";
export const blue1900 = "#e9f3f5";

export const blueBright400 = "#98caff"; /* NAME: "Info Button Blue" */
export const blueBright500 = "#73b5fb"; /* NAME: "Not so Boring Blue" */
export const blueBright800 = "#3477bb"; /* NAME: "Button Blue" */
export const blueBright800Bright = brighten(blueBright800);
export const blueBright800Dark = darken(blueBright800);

export const blueVibrant500 = "#24d2fb"; /* NAME: "Vibrant Border Blue" */

export const inactiveTab = "#0091bc";

//------------------------

export const turquoise500 = "#39c"; /* NAME: "Linky Blue" */

//------------------------

export const yellow100 = "#fffcdc"; /* NAME: "Yellow Highlighter" */
export const yellow300 = "#fff58b"; /* NAME: "Yellow Border" */
export const yellow500 = "#f3ca02"; /* NAME: "Puke Yellow" */
export const yellow600 = "#B1874A";
export const yellow700 = "#8a6d3b";
export const yellow800 = "#fcf8e3";
export const yellow900 = "#faebcc";
export const yellow1000 = "#e2c794";
export const yellow1100 = "#fcf7df";
export const yellow1200 = "#d8bb8e";
export const yellow1300 = "#e5e3dB";

export const yellowMatte600 = "#e0d69c"; /* NAME: "Ugly Yellow Border" */

//------------------------

// Status colors

export const errorColor = "#a94442";
export const errorBorderColor = "#ccc";
export const errorBackgroundColor = "#eed3d7";

export const successColor = "#39892f";
export const successBorderColor = "#b4dbb4";
export const successBackgroundColor = "#d8ebda";

export const warningColor = "#b1874a";
export const warningBorderColor = "#e7e0b8";
export const warningBackgroundColor = "#fff3ce";

export const infoColor = "#31708f";
export const infoBorderColor = "#bce8f1";
export const infoBackgroundColor = "#d9edf7";

// End Banner

// region Helpers

export function brighten(color) {
  return polishedDarken(0.075, saturate(0.15, color));
}

export function darken(color) {
  return shade(0.85, polishedDarken(0.15, color));
}

// endregion
