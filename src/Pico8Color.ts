import { BpxRgbColor } from "@beetpx/beetpx";

// noinspection JSUnusedGlobalSymbols
export class Pico8Colors {
  // hex values taken from https://pico-8.fandom.com/wiki/Palette#The_system_palette

  // standard colors
  // 0 - 3
  static black = BpxRgbColor.fromCssHex("#000000");
  static darkBlue = BpxRgbColor.fromCssHex("#1D2B53");
  static darkPurple = BpxRgbColor.fromCssHex("#7E2553");
  static darkGreen = BpxRgbColor.fromCssHex("#008751");
  // 4 - 7
  static brown = BpxRgbColor.fromCssHex("#AB5236");
  static darkGrey = BpxRgbColor.fromCssHex("#5F574F");
  static lightGrey = BpxRgbColor.fromCssHex("#C2C3C7");
  static white = BpxRgbColor.fromCssHex("#FFF1E8");
  // 8 - 11
  static red = BpxRgbColor.fromCssHex("#FF004D");
  static orange = BpxRgbColor.fromCssHex("#FFA300");
  static yellow = BpxRgbColor.fromCssHex("#FFEC27");
  static green = BpxRgbColor.fromCssHex("#00E436");
  // 12 - 15
  static blue = BpxRgbColor.fromCssHex("#29ADFF");
  static lavender = BpxRgbColor.fromCssHex("#83769C");
  static pink = BpxRgbColor.fromCssHex("#FF77A8");
  static lightPeach = BpxRgbColor.fromCssHex("#FFCCAA");

  // "secret" colors
  // 128 - 131
  static brownishBlack = BpxRgbColor.fromCssHex("#291814");
  static darkerBlue = BpxRgbColor.fromCssHex("#111D35");
  static darkerPurple = BpxRgbColor.fromCssHex("#422136");
  static blueGreen = BpxRgbColor.fromCssHex("#125359");
  // 132 - 135
  static darkBrown = BpxRgbColor.fromCssHex("#742F29");
  static darkerGrey = BpxRgbColor.fromCssHex("#49333B");
  static mediumGrey = BpxRgbColor.fromCssHex("#A28879");
  static lightYellow = BpxRgbColor.fromCssHex("#F3EF7D");
  // 136 - 139
  static darkRed = BpxRgbColor.fromCssHex("#BE1250");
  static darkOrange = BpxRgbColor.fromCssHex("#FF6C24");
  static limeGreen = BpxRgbColor.fromCssHex("#A8E72E");
  static mediumGreen = BpxRgbColor.fromCssHex("#00B543");
  // 140 - 143
  static trueBlue = BpxRgbColor.fromCssHex("#065AB5");
  static mauve = BpxRgbColor.fromCssHex("#754665");
  static darkPeach = BpxRgbColor.fromCssHex("#FF6E59");
  static peach = BpxRgbColor.fromCssHex("#FF9D81");
}
