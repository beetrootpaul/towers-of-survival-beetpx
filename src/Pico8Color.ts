import { $rgb } from "@beetpx/beetpx";

// noinspection JSUnusedGlobalSymbols
export class Pico8Colors {
  // hex values taken from https://pico-8.fandom.com/wiki/Palette#The_system_palette

  // standard colors
  // 0 - 3
  static black = $rgb("#000000");
  static darkBlue = $rgb("#1D2B53");
  static darkPurple = $rgb("#7E2553");
  static darkGreen = $rgb("#008751");
  // 4 - 7
  static brown = $rgb("#AB5236");
  static darkGrey = $rgb("#5F574F");
  static lightGrey = $rgb("#C2C3C7");
  static white = $rgb("#FFF1E8");
  // 8 - 11
  static red = $rgb("#FF004D");
  static orange = $rgb("#FFA300");
  static yellow = $rgb("#FFEC27");
  static green = $rgb("#00E436");
  // 12 - 15
  static blue = $rgb("#29ADFF");
  static lavender = $rgb("#83769C");
  static pink = $rgb("#FF77A8");
  static lightPeach = $rgb("#FFCCAA");

  // "secret" colors
  // 128 - 131
  static brownishBlack = $rgb("#291814");
  static darkerBlue = $rgb("#111D35");
  static darkerPurple = $rgb("#422136");
  static blueGreen = $rgb("#125359");
  // 132 - 135
  static darkBrown = $rgb("#742F29");
  static darkerGrey = $rgb("#49333B");
  static mediumGrey = $rgb("#A28879");
  static lightYellow = $rgb("#F3EF7D");
  // 136 - 139
  static darkRed = $rgb("#BE1250");
  static darkOrange = $rgb("#FF6C24");
  static limeGreen = $rgb("#A8E72E");
  static mediumGreen = $rgb("#00B543");
  // 140 - 143
  static trueBlue = $rgb("#065AB5");
  static mauve = $rgb("#754665");
  static darkPeach = $rgb("#FF6E59");
  static peach = $rgb("#FF9D81");
}
