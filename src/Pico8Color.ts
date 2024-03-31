import { rgb_ } from "@beetpx/beetpx";

// noinspection JSUnusedGlobalSymbols
export class Pico8Colors {
  // hex values taken from https://pico-8.fandom.com/wiki/Palette#The_system_palette

  // standard colors
  // 0 - 3
  static black = rgb_("#000000");
  static darkBlue = rgb_("#1D2B53");
  static darkPurple = rgb_("#7E2553");
  static darkGreen = rgb_("#008751");
  // 4 - 7
  static brown = rgb_("#AB5236");
  static darkGrey = rgb_("#5F574F");
  static lightGrey = rgb_("#C2C3C7");
  static white = rgb_("#FFF1E8");
  // 8 - 11
  static red = rgb_("#FF004D");
  static orange = rgb_("#FFA300");
  static yellow = rgb_("#FFEC27");
  static green = rgb_("#00E436");
  // 12 - 15
  static blue = rgb_("#29ADFF");
  static lavender = rgb_("#83769C");
  static pink = rgb_("#FF77A8");
  static lightPeach = rgb_("#FFCCAA");

  // "secret" colors
  // 128 - 131
  static brownishBlack = rgb_("#291814");
  static darkerBlue = rgb_("#111D35");
  static darkerPurple = rgb_("#422136");
  static blueGreen = rgb_("#125359");
  // 132 - 135
  static darkBrown = rgb_("#742F29");
  static darkerGrey = rgb_("#49333B");
  static mediumGrey = rgb_("#A28879");
  static lightYellow = rgb_("#F3EF7D");
  // 136 - 139
  static darkRed = rgb_("#BE1250");
  static darkOrange = rgb_("#FF6C24");
  static limeGreen = rgb_("#A8E72E");
  static mediumGreen = rgb_("#00B543");
  // 140 - 143
  static trueBlue = rgb_("#065AB5");
  static mauve = rgb_("#754665");
  static darkPeach = rgb_("#FF6E59");
  static peach = rgb_("#FF9D81");
}
