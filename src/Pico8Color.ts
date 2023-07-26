import { BpxSolidColor } from "beetpx";

// noinspection JSUnusedGlobalSymbols
export class Pico8Colors {
  // hex values taken from https://pico-8.fandom.com/wiki/Palette#The_system_palette

  // standard colors
  // 0 - 3
  static black = BpxSolidColor.fromRgbCssHex("#000000");
  static darkBlue = BpxSolidColor.fromRgbCssHex("#1D2B53");
  static darkPurple = BpxSolidColor.fromRgbCssHex("#7E2553");
  static darkGreen = BpxSolidColor.fromRgbCssHex("#008751");
  // 4 - 7
  // TODO: rename to brown once migrated the whole codebase from Lua
  static brownLight = BpxSolidColor.fromRgbCssHex("#AB5236");
  // TODO: rename to darkGrey once migrated the whole codebase from Lua
  static greyDark = BpxSolidColor.fromRgbCssHex("#5F574F");
  // TODO: rename to lightGrey once migrated the whole codebase from Lua
  static greyLight = BpxSolidColor.fromRgbCssHex("#C2C3C7");
  static white = BpxSolidColor.fromRgbCssHex("#FFF1E8");
  // 8 - 11
  // TODO: rename to red once migrated the whole codebase from Lua
  static redLight = BpxSolidColor.fromRgbCssHex("#FF004D");
  static orange = BpxSolidColor.fromRgbCssHex("#FFA300");
  // TODO: rename to yellow once migrated the whole codebase from Lua
  static yellowOld = BpxSolidColor.fromRgbCssHex("#FFEC27");
  // TODO: rename to green once migrated the whole codebase from Lua
  static greenOld = BpxSolidColor.fromRgbCssHex("#00E436");
  // 12 - 15
  // TODO: rename to blue once migrated the whole codebase from Lua
  static blueLight = BpxSolidColor.fromRgbCssHex("#29ADFF");
  // TODO: rename to lavender once migrated the whole codebase from Lua
  static greyViolet = BpxSolidColor.fromRgbCssHex("#83769C");
  static pink = BpxSolidColor.fromRgbCssHex("#FF77A8");
  static lightPeach = BpxSolidColor.fromRgbCssHex("#FFCCAA");

  // "secret" colors
  // 128 - 131
  // TODO: rename to brownishBlack once migrated the whole codebase from Lua
  static brownDark = BpxSolidColor.fromRgbCssHex("#291814");
  static darkerBlue = BpxSolidColor.fromRgbCssHex("#111D35");
  static darkerPurple = BpxSolidColor.fromRgbCssHex("#422136");
  static blueGreen = BpxSolidColor.fromRgbCssHex("#125359");
  // 132 - 135
  static darkBrown = BpxSolidColor.fromRgbCssHex("#742F29");
  // TODO: rename to darkerGrey once migrated the whole codebase from Lua
  static brownMid = BpxSolidColor.fromRgbCssHex("#49333B");
  // TODO: rename to mediumGrey once migrated the whole codebase from Lua
  static sand = BpxSolidColor.fromRgbCssHex("#A28879");
  // TODO: rename to lightYellow once migrated the whole codebase from Lua
  static yellow = BpxSolidColor.fromRgbCssHex("#F3EF7D");
  // 136 - 139
  // TODO: rename to darkRed once migrated the whole codebase from Lua
  static redDark = BpxSolidColor.fromRgbCssHex("#BE1250");
  static darkOrange = BpxSolidColor.fromRgbCssHex("#FF6C24");
  static limeGreen = BpxSolidColor.fromRgbCssHex("#A8E72E");
  // TODO: rename to mediumGreen once migrated the whole codebase from Lua
  static green = BpxSolidColor.fromRgbCssHex("#00B543");
  // 140 - 143
  // TODO: rename to trueBlue once migrated the whole codebase from Lua
  static blueDark = BpxSolidColor.fromRgbCssHex("#065AB5");
  // TODO: rename to mauve once migrated the whole codebase from Lua
  static brownPurple = BpxSolidColor.fromRgbCssHex("#754665");
  // TODO: rename to darkPeach once migrated the whole codebase from Lua
  static salmon = BpxSolidColor.fromRgbCssHex("#FF6E59");
  static peach = BpxSolidColor.fromRgbCssHex("#FF9D81");
}
